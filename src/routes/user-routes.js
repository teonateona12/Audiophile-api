import express from "express";
import { signup, login, authMe } from "../controllers/userControler.js";
import multer from "multer";
import getProducts from "../controllers/productsController.js";
import { getCart, postCart } from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.middleware.js";

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
// router.post("/verify", emailVerification);
router.post("/cart", postCart);

router.get("/products", getProducts);
router.get("/carts", getCart);
// router.put("/cart/update", putCart);
router.get("/auth/me", authMiddleware, authMe);

export default router;
