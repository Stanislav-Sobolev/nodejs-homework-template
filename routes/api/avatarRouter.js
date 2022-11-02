// const express = require("express");
// const path = require("path");
// const fs = require("fs").promises;
// const multer = require("multer");

// const storeImage = path.join(process.cwd(), "public", "avatars");

// const avatarRouter = express.Router();

// const tempDir = path.join(__dirname, "/../../temp");

// const storage = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 1048576,
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// avatarRouter.post(
//   "/upload",
//   upload.single("picture"),
//   async (req, res, next) => {
//     const { description } = req.body;
//     const { path: temporaryName, originalname } = req.file;
//     const fileName = path.join(storeImage, originalname);
//     try {
//       await fs.rename(temporaryName, fileName);
//     } catch (err) {
//       await fs.unlink(temporaryName);
//       return next(err);
//     }
//     res.json({ description, message: "Файл успешно загружен", status: 200 });
//   }
// );

// module.exports = { avatarRouter, upload, storeImage };
