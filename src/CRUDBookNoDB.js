// Description: CRUD Book API (No Database)
// npm install express dotenv
// Run: node CRUDBookNoDB.js
// Test with Postman

require('dotenv').config();
const express = require('express');
const app = express();

// parse incoming JSON requests
app.use(express.json());


// sample data (in-memory)
let books = [
  { id: 1, 
    title: 'Book 1', 
    author: 'Author 1' 
  },
  { id: 2, 
    title: 'Book 2', 
    author: 'Author 2' 
  },
  { id: 3, 
    title: 'Book 3', 
    author: 'Author 3' 
  }
];

app.get("/", (req, res) => {
  res.send("Hello Books World!");
});

// =====================
// READ: get all books
// =====================
app.get('/books', (req, res) => {
  res.json(books);
});

// =====================
// READ: get book by id
// =====================
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) res.status(404).send('Book not found');
  res.json(book);
});

// =====================
// CREATE: add new book
// =====================
app.post('/books', (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,  
    author: req.body.author
  };
  books.push(book);
  res.send(book);
});

// =====================
// UPDATE: update a book
// =====================
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) res.status(404).send('Book not found');
  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

// =====================
// DELETE: delete a book
// =====================
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if(index === -1) res.status(404).send('Book not found');
  const book = books[index];
  books.splice(index, 1);
  res.send(book);
});

// =====================
// START SERVER
// =====================
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server running on port http://localhost:${port}...`);
});
