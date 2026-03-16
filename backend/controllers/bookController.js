const Book = require("../models/Book");

// @desc    Create a new book
// @route   POST /api/books
// @access  Private
exports.createBook = async (req, res) => {
  try {
    const { title, author, subtitle, chapters, coverImage } = req.body;

    if (!title || !author) {
      return res
        .status(400)
        .json({ message: "Please provide a title and author" });
    }

    const book = await Book.create({
      userId: req.user._id,
      title,
      author,
      subtitle,
      chapters,
      coverImage,
    });

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all books for a user
// @route   GET /api/books
// @access  Private
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user._id });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all books for a user
// @route   GET /api/books
// @access  Private
// @desc    Get a single book by ID
// @route   GET /api/books/:id
// @access  Private
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the logged-in user owns the book
    if (book.userId.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to view this book" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the logged-in user owns the book
    if (book.userId.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this book" });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the logged-in user owns the book
    if (book.userId.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this book" });
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// @desc    Update a book's cover image
// @route   PUT /api/books/cover/:id
// @access  Private
exports.updateBookCover = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the logged-in user owns the book
    if (book.userId.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this book" });
    }

    if (req.file) {
      book.coverImage = `/${req.file.path}`;
    } else {
      return res.status(400).json({ message: "No image file provided" });
    }

    const updatedBook = await book.save();

    res.status(200).json(updateBook);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
