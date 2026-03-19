const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const protectMiddleware = require("./../middlewares/authMiddleware");
const upload = require("./../middlewares/uploadMiddleware");
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/profile", protectMiddleware.protect, authController.getProfile);
router.put(
  "/profile/avatar",
  protectMiddleware.protect,
  upload.single("avatar"),
  authController.updateAvatar,
);
router.put(
  "/profile",
  protectMiddleware.protect,
  authController.updateUserProfile,
);
module.exports = router;
