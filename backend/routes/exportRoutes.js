const express = require("express");

const router = express.Router();

const {
  exportAsPDF,
  exportAsDocument,
} = require("../controllers/exportController");

const { protect } = require("../middlewares/authMiddleware");

router.get("/:id/pdf", protect, exportAsPDF);

router.get("/:id/doc", protect, exportAsDocument);

module.exports = router;
