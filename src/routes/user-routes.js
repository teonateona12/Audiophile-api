import express from "express";
import { signup, login } from "../controllers/userControler.js";
import multer from "multer";

const router = express.Router();
const fileStorageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatar");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
router.post(
  "/signup",
  multer({ storage: fileStorageAvatar, fileFilter: fileFilter }).single(
    "avatar"
  ),
  signup
);
router.post("/login", login);

export default router;
