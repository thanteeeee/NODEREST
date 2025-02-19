// Description: REST API with MongoDB
// npm install express mongoose
// Run this file with node index.js
// Test with Postman

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Connect to the MongoDB database
mongoose.connect('mongodb://admin:LQZkkg73929@node71378-node267tue.proen.app.ruk-com.cloud:11722', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Define the book model
const bookSchema = new mongoose.Schema({
  id : Number,
  title: String,
  author: String
});

const Book = mongoose.model('Book', bookSchema);

// API routes
// Create a new book with auto-increase id 1,2,3,4,5...
app.post('/books', async (req, res) => {
  const lastBook = await Book.findOne().sort({ id: -1 });
  const newId = lastBook ? lastBook.id + 1 : 1;
  const book = new Book({
    id: newId,
    title: req.body.title,
    author: req.body.author
  });
  await book.save();
  res.send(book);
}
);

// route /books will be used to get all books
// Get a list of all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// Get a single book by id
app.get('/books/:id', async (req, res) => {
  const book = await Book.findOne({ id: req.params.id });
  res.send(book);
});

// Update a book
app.put('/books/:id', async (req, res) => {
  const book = await Book.findOne({ id: req.params.id });
  book.title = req.body.title;
  book.author = req.body.author;
  await book.save();
  res.send(book);
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  const result = await Book.deleteOne({ id: req.params.id });
  res.send(result);
});


app.listen(3000, () => {
  console.log('API server is listening on port 3000');
});