const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET ALL BOOKS
router.get('/', async (req, res) => {
  console.log("GET /api/books called");

  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// ADD BOOK
router.post('/', async (req, res) => {
  try {
    const { title, author, price, genre } = req.body;

    const newBook = new Book({ title, author, price, genre });
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE BOOK
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE BOOK
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;