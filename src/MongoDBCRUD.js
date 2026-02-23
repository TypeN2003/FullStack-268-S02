const express = require('express');
const mangoose = require('mongoose');
const boduParser = require('body-parser');

mangoose.connect(
    'mongodb://admin:HOTbxp45999@node86103-typen.proen.app.ruk-com.cloud:11873', 
    { useNewUrlParser: true, 
      useUnifiedTopology: true 
    });

const Book = mangoose.model('Book', {
    id:{
        type: Number,
        uniqe: true,
        required: true,
    },
    title: String,
    author: String,
});

const app = express();
app.use(boduParser.json());

app.post('/books', async (req, res) => {
    try {
        const lastBook = await Book.findOne().sort({ id: -1 });
        const nextId = lastBook ? lastBook.id + 1 : 1;
        const book = new Book({ id: nextId, title: req.body.title, author: req.body.author }        
        );
        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
}
);

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ id: req.params.id });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ id: req.params.id });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});