const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs").promises;

const storeImage = path.join(process.cwd(), "public", "avatars");

const registrationUser = async (req, res, next) => {
  const { email, password: pass, subscription } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(409).json({
      message: "Email in use",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(pass, 10);

  const avatarURL = gravatar.url(email);

  const result = await User.create({
    email,
    password: hashedPassword,
    subscription,
    avatarURL,
  });
  const user = {
    email: result.email,
    subscription: result.subscription,
  };

  res.status(201).json({
    status: "success",
    data: { user },
  });
};

const loginUser = async (req, res, next) => {
  const { email, password: pass } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
    return;
  }

  const hashedPassword = await bcrypt.compare(pass, user.password);

  if (!hashedPassword) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
    return;
  }

  const payload = {
    id: user._id,
    email: user.email,
  };
  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret);

  await User.updateOne({ _id: user._id }, { token });

  res.status(200).json({
    status: "success",
    data: { token, user: { email, subscription: user.subscription } },
  });
};

const logoutUser = async (req, res, next) => {
  try {
    const user = req.user;

    await User.updateOne({ _id: user._id }, { token: null });

    res.status(204).json({
      status: "success",
      message: "No Content",
    });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: temporaryName, originalname } = req.file;
  const extention = originalname.split(".").pop();

  const fileName = `${_id}.${extention}`;
  const resultUpload = path.join(storeImage, fileName);
  const avatarURL = path.join("avatars", fileName);

  try {
    Jimp.read(temporaryName, (err, image) => {
      if (err) throw err;
      return image.resize(250, 250).write(resultUpload);
    });
    await User.findByIdAndUpdate(_id, { avatarURL });
  } catch (err) {
    return next(err);
  }
  res.json({ avatarURL: avatarURL, status: 200 });
};

const uploadUserAvatar = async (req, res, next) => {
  const { description } = req.body;
  const { path: temporaryName, originalname } = req.file;
  const fileName = path.join(storeImage, originalname);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({ description, message: "Файл успешно загружен", status: 200 });
};

module.exports = {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserAvatar,
  uploadUserAvatar,
};
