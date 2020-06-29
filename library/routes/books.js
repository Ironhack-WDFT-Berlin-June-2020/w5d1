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

router.get('/books/add', (req, res) => {
  res.render('bookForm');
})

router.get('/books/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  Book.findById(bookId).then(bookFromDatabase => {
    res.render('bookDetails', { book: bookFromDatabase });
  }).catch(err => {
    console.log(err);
  });
});

router.post('/books', (req, res) => {
  console.log(req.body);
  // const title = req.body.title;
  // const author = req.body.author;
  // const description = req.body.description;
  // const rating = req.body.rating;
  const { title, author, description, rating } = req.body;
  Book.create({
    title: title,
    author: author,
    description: description,
    rating: rating
  }).then(book => {
    console.log(`Success! ${title} was added to the database.`);
    res.redirect(`/books/${book._id}`);
  }).catch(err => {
    console.log(err);
  })
})

router.get('/books/edit/:bookId', (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.render('bookEdit', { book: book })
    }).catch(err => {
      console.log(err);
    });
})

router.get('/books/delete/:bookId', (req, res) => {
  Book.deleteOne({ _id: req.params.bookId })
    .then(() => {
      res.redirect('/books');
    })
    .catch(err => {
      console.log(err);
      // next(err)
    })
})

router.post('/books/edit/:bookId', (req, res) => {
  const { title, author, description, rating } = req.body;
  Book.findByIdAndUpdate(req.params.bookId, {
    title,
    description,
    author,
    rating
  })
    .then(book => {
      res.redirect(`/books/${book._id}`);
    })
    .catch(err => {
      console.log(err);
    });
})

module.exports = router;