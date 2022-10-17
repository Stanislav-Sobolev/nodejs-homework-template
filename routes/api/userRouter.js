const express = require("express");
const {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../../controllers/userCtrl");
const validationBody = require("../../middlewares/validationBody");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

const { schemaUser } = require("../../models/userModel");

const userRouter = express.Router();

userRouter.post(
  "/signup",
  validationBody(schemaUser),
  ctrlWrapper(registrationUser)
);

userRouter.post("/login", validationBody(schemaUser), ctrlWrapper(loginUser));

userRouter.post("/logout", logoutUser);

userRouter.post("/current", currentUser);

module.exports = userRouter;
