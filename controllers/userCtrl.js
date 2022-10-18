const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  const result = await User.create({
    email,
    password: hashedPassword,
    subscription,
  });
  const user = {
    email: result.email,
    subscription: result.subscription,
  };
  res.json({
    status: "success",
    code: 201,
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

  res.json({
    status: "success",
    code: 200,
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

module.exports = {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
};
