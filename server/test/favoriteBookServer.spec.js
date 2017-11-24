const request = require('supertest');
const chai = require('chai');
const expect = require('expect');
const app = require('../../app');
const { Book } = require('../models/index').Book;
const { userBorrowedBooks } = require('../models/index').UserBorrowedBooks;
const favoritesBook = require('../models/index').favoritesBook;

describe('#Favorite Books', () => {
    describe('favorite Books', () => {
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


        //testing for marking favorite books
        it('should check for books marked as favorites', (done)=>{
            let favoritesBookId = {
                bookId: 1,
                userId: 1
            }

            request(app)
                .post('/api/users/:userId/fav/:bookId')
                .send(favoritesBookId)
                .expect(200)
                .expect((res)=>{
                    expect(res.body).toInclude({favoritesBookId})
                })
                .end((err, res)=>{
                    if(err){
                        return done(err);
                    }
                    favoritesBook.find({where:{ 
                        bookId: 1,
                        userId: 1}}).then((favoritesbook)=>{
                            expect(favoritesbook.lenght).toBe(1)
                            done();
                        }).catch((err) => { done(err); });
                });
                done();            
        })
});