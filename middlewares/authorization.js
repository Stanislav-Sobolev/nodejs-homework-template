const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const authorization = async (req, res, next) => {
  try {
    const [, tokenRequest] = req.headers.authorization.split(" ");

    const secret = process.env.SECRET;
    const token = jwt.verify(tokenRequest, secret);
    const user = await User.findById(token.id);

    if (!user || user.token !== tokenRequest) {
      throw Error("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authorization;
