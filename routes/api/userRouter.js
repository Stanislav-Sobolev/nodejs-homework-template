const express = require("express");
const {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../../controllers/userCtrl");
const validationBody = require("../../middlewares/validationBody");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const authorization = require("../../middlewares/authorization");

const { schemaUserLogin, schemaUserSignup } = require("../../models/userModel");

const userRouter = express.Router();

userRouter.post(
  "/signup",
  validationBody(schemaUserSignup),
  ctrlWrapper(registrationUser)
);

userRouter.post(
  "/login",
  validationBody(schemaUserLogin),
  ctrlWrapper(loginUser)
);

userRouter.post("/logout", authorization, logoutUser);

userRouter.post("/current", authorization, currentUser);

module.exports = userRouter;
