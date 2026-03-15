const express = require("express");
const router = express.Router();

const authController = require("./../middlewares/authMiddleware");
const aiController = require("./../controllers/aiController");
router.use(authController.protect);

router.post("/generate-outline", aiController.generateOutline);

router.post("/generate-chapter-content", aiController.generateChapterContent);

module.exports = router;
