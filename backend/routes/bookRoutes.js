const express = require("express");
const router = express.Router();
const bookController = require("./../controllers/bookController");
const authMiddleware = require("./../middlewares/authMiddleware");
const upload = require("./../middlewares/uploadMiddleware");
//use the protected route for all the routes here
router.use(authMiddleware.protect);

router.route("/").get(bookController.getBooks).post(bookController.createBook);

router
  .route("/:id")
  .get(bookController.getBookById)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

router.route("/cover/:id").put(upload, bookController.updateBookCover);

module.exports = router;
