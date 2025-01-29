//Description : CRUF Book No DB
//npm install express
//Run this file with node CRUDBookNoDB.js

require("dotenv").config();
const express = require('express');
const app = express();

//parse incoming requests
app.use(express.json());

//sample data
let book = [
    {
        id: 1,
        title: 'Book 1',
        author: 'Author 1'
    },
    {
        id: 2,
        title: 'Book 2',
        author: 'Author 2'
    },
    {
        id: 3,
        title: 'Book 3',
        author: 'Author 3'
    }
];

//route ot get all books
app.get('/book',(req, res) => {
    res.json(books);
});

// route to get a book by id
app.get('/book/:id', (req,res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) res.status(404).send('Book not found');
    res.json(book); 
});

// route to create a new book 
app.post('/book', (req, res) => {
    const book = {
        id: books.length +1 ,
        title: req.body.title,author: req.body.author
    };
    books.push(book);
    res.send(book);
});

//route to update a book
app.put('/book/: id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) res.status(404).sendFile('Book not found');
    book.title= req.body.title;
    book.author = req.body.aythor;
    res.send(book);
});

//route to delete a book
app.delete('/book/:id', (req,res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) res.status(404).send('Book not found');
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});

const port = process.env.PORt || 3000;
console.log(`Example app listening at http://localhost:${port}`);
