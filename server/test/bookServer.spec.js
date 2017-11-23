const request = require('supertest');
const expect = require('expect');
const app = require('../../app');
const { Book } = require('../models/book');

describe('#Book', () => {
  describe('Books', () => {
    beforeEach((done) => { //Before each test we empty the database
        Book.remove({}, (err) => { 
           done();         
        });     
    });
  });  
  describe('POST/api/books', () => {
    it('should create a new book ', (done) => {
      let bookParameters = {
        bookTitle: 'Pilgrim progress',
        author: 'John Buyan',
        isbn: '4532vgvgg90',
        bookSummary: 'Christian faith',
        quantity: 7,
      };
      request(app)
        .post('/api/books')
        .send({bookParameters})
        .expect(200)
        .expect((res) => {
          expect(res.body).toBe('Pilgrim progress, Succesfully recorded');
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          // to confirm if book has been added to database
          Book.find().then((book) => {
            expect(book.length).toBe(1);
            expect(res.body).toInclude(bookParameters.bookTitle);
            done();
          }).catch((err) => { done(err); });
        });
      done();
    });
  });


  describe('POST/api/books', () => {
    it('should get bad request when book exist', (done) => {
       let bookParameters = Book;    
      request(app)
        .post('/api/books')
        .send({ bookParameters })
        .expect(400)
        .expect((res) => {
          expect(res.body).toBe('Book title already exist');
        })
        .end(done());
     });
  });


  describe('Books', () => {
    it('should get all books list ', (done) => {
      const firstBook = {
        bookTitle: 'Pilgrim progress',
        author: 'John Buyan',
        isbn: '4532vgvgg90',
        bookSummary: 'Christian faith',
        quantity: 4,
      };
      const secondBook = {
        bookTitle: 'Ade our naughty little brother',
        author: 'Ade',
        isbn: '4532-vgvgg-90',
        bookSummary: 'Literature',
        quantity: 5,
      };
      const thirdBook = {
        bookTitle: 'Culture and function',
        author: 'San Babatunde',
        isbn: '4532-vgvgg-90',
        bookSummary: 'History',
        quantity: 5,
      };

      request(app)
        .get('/api/books')
        .send({firstBook, secondBook, thirdBook})
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toEqual(3);
        })
.end((err, res) => {
          if (err, res) {
            return done(err);
          }
          // to confirm if book has been added to database
          Book.all().then((book) => {
            expect(res.body.message).toInclude(' Succesfully recorded');
            expect(book).toInclude(firstBook);
            expect(book).toInclude(secondBook);
            expect(book).toInclude(thirdBook);
            done();
          }).catch((err) => { done(err); });
        });
      done();
    });
  });
});

