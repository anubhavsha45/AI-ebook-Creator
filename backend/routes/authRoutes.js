const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const protectMiddleware = require("./../middlewares/authMiddleware");
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/profile", protectMiddleware.protect, authController.getProfile);
router.put(
  "/profile",
  protectMiddleware.protect,
  authController.updateUserProfile,
);
module.exports = router;
