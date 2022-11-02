const express = require("express");
const {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserAvatar,
  uploadUserAvatar,
} = require("../../controllers/userCtrl");
const validationBody = require("../../middlewares/validationBody");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const authorization = require("../../middlewares/authorization");
const { upload } = require("../../controllers/userCtrl");

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

userRouter.post("/logout", authorization, ctrlWrapper(logoutUser));

userRouter.post("/current", authorization, ctrlWrapper(currentUser));

userRouter.patch(
  "/avatars",
  authorization,
  upload.single("picture"),
  updateUserAvatar
);

userRouter.post("/upload", upload.single("picture"), uploadUserAvatar);

module.exports = userRouter;
