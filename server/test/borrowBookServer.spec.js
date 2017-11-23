const request = require('supertest');
const expect = require('expect');
const app = require('../../app');
const { Book } = require('../models/index').Book;
const { userBorrowedBooks } = require('../models/index').UserBorrowedBooks;
const User = require('../models/index').User;

describe('#Borrow Books', () => {
  describe('borrow Books', () => {
    beforeEach((done) => { //Before each test we empty the database
        Book.remove({}, (err) => { 
           done();         
        }); 
        User.remove({}, (err) => { 
          done();         
       });  
       userBorrowedBooks.remove({}, (err) => { 
        done();         
     });          
    });
  });  

  //testing for borrowing of books
  describe('#Borrowing Books', () => {
   it('should check for if user exist', (done)=>{
      let IdParams = {
        userId:'wrong id',
        bookId:'1'
      };
      request(app)
        .post('/api/users/:userId/borrow/:bookId')
        .send(IdParams)
        .expect(400)
        .expect((res)=>{
          expect(res.body).toEqual('User does not exist');
        })
        .end((err, res)=>{
          if(err) {
            return done(err);
          }
          User.find({where:{id: userId}}).then((user)=>{
            expect(user.length).toBe(0);
            expect(res.body).toBe(null);
            done();
          }).catch((err) => { done(err); });
        });
        done();  
    });
  });

  //testing for non-existing books
  describe('#Borrowing Books', () => {
    it('should check for if book exist', (done)=>{
       let IdParams = {
         userId:'1',
         bookId:'wrong id'
       };
       request(app)
         .post('/api/users/:userId/borrow/:bookId')
         .send(IdParams)
         .expect(400)
         .expect((res)=>{
           expect(res.body).toEqual('Book does not exist');
         })
         .end((err, res)=>{
           if(err) {
             return done(err);
           }
           userBorrowedBooks.find({where:{id: bookId}}).then((userborrowedbooks)=>{
             expect(userborrowedbooks.length).toBe(0);
             expect(res.body).toBe(null);
             done();
           }).catch((err) => { done(err); });
         });
         done();  
     });
   });

   
  //testing for valid book and user and borrowing books books
  describe('#Borrowing Books', () => {
    it('should check if book exist', (done)=>{
       let IdParams = {
         userId:'1',
         bookId:'1'
       };
       request(app)
         .post('/api/users/:userId/borrow/:bookId')
         .send(IdParams)
         .expect(200)
         .expect((res)=>{
           expect(res.body).toInclude( 'You have just borrowed ')
         })
         .end((err, res)=>{
           if(err) {
             return done(err);
           }
           userBorrowedBooks.find({where:{bookId: bookId, userId:userId }}).then((user)=>{
             expect(book.length).toBe(1);
             expect(res.body).toExist();
             done();
           }).catch((err) => { done(err); });
         });
         done();  
     });
   });

    //testing for a decrease in book quantity
  describe('#Borrowing Books', () => {
    it('should check if book exist', (done)=>{
       let IdParams = {
         userId:'1',
         bookId:'1'
       };
       request(app)
         .post('/api/users/:userId/borrow/:bookId')
         .send(IdParams)
         .expect(200)
         .expect((res)=>{
           expect(res.body).toInclude( 'You have just borrowed ')
         })
         .end((err, res)=>{
           if(err) {
             return done(err);
           }
           Book.find({where:{bookId: bookId }}).then((book)=>{
             expect(Book.quantity).toBe(book.quantity);
             expect(res.body).toExist();
             done();
           }).catch((err) => { done(err); });
         });
         done();  
     });
   });



 });