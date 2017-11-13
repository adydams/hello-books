const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
//const dummyMemory =require('./dummyMemory');
//set up express as app
const app = express();
const userController = require('./server/controllers/user');
const bookController = require('./server/controllers/book')
const borrowBookController = require('./server/controllers/borrowBooks');
const returnBookController = require('./server/controllers/returnBooks');
const booksFavoriteController =require('./server/controllers/favoritesBooks');
const bookReviewController = require('./server/controllers/review')
//log response to the console
app.use(logger('dev'))

//parse incoming request as JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//a default routes

app.get('/api', (req, res)=>{
    res.status(200).send({
       message: 'Welcome to Hello-Book, default routes'
    });
});

// adding a new book
app.post('/api/books', bookController.books);

//updating existing books
app.put('/api/books/:bookId', bookController.put);

//getting all the list of books 
app.get('/api/books', bookController.list);

//route to borrow books for signup users only 
app.post('/api/users/:userId/borrow/:bookId', borrowBookController.borrowBooks );

//routes for users to return borrowed books
app.post('/api/users/:userId/return/:bookId', returnBookController.returnBorrowedBook);

//routes for users to review books
app.post('/api/users/:userId/review/:bookId', bookReviewController.bookReview);

//routes to mark a book as favorite
app.post('/api/users/:userId/fav/:bookId',booksFavoriteController.markFavoriteBook)

//routes to get all favorite books for a user
app.get('/api/users/:userId/favbooks', booksFavoriteController.getUserFavoriteBook)

//signup route
app.post('/api/user/signup', userController.signup)

//signin route
app.post('/api/user/signin', userController.signin)

module.exports = app; 