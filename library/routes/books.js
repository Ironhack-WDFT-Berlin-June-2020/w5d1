const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.get('/books', (req, res) => {
  // get all the books from the database
  Book.find().then(booksFromDatabase => {
    // render a 'books' view with the books data
    // console.log(booksFromDatabase);
    res.render('books', { booksList: booksFromDatabase });
  }).catch(err => {
    console.log(err);
  })
});

router.get('/books/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  Book.findById(bookId).then(bookFromDatabase => {
    res.render('bookDetails', { book: bookFromDatabase });
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;