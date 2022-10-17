const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const authorization = async (req, res, next) => {
  try {
    const [, tokenRequest] = req.headers.authorization.split(" ");

    const secret = process.env.SECRET;
    const decoded = jwt.verify(tokenRequest, secret);
    const user = await User.findById(decoded.id);

    if (user.token !== tokenRequest) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

module.exports = authorization;
