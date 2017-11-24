const request = require('supertest');
const chai = require('chai');
const expect = require('expect');
const app = require('../../app');
const { Book } = require('../models/index').Book;
const { Review } = require('../models/index').review;
const User = require('../models/index').User;


describe('#Book review', () => {
    describe('boorow Books', () => {
        beforeEach((done) => { //Before each test we empty the database
            Book.remove({}, (err) => { 
               done();         
            }); 
            User.remove({}, (err) => { 
              done();         
           });  
           review.remove({}, (err) => { 
            done();         
         });          
        });
    });
    //testing for review comments created
    it('check for created reviewcomments',(done)=>{
        let reviewParams = {
            userId:'1',
            bookId:'1',
            comments:'Book 1 is reviewed'
        };
    
        request(app)
        .post('/api/users/:userId/review/:bookId')
        .send(reviewParams)
        .expect(200)
        .expect((res)=>{
            expect(res.body).toInclude({reviewParams})
        })
        .end((err, res)=>{
            if(err){
                return done(err)
            }
            Review.find({where:{
                userId:'1',
                bookId:'1',
                comments:'Book 1 is reviewed'
            }}).then((review)=>{
                expect(review.length).toBe(1);
                done();
            }).catch((err) => { done(err); });
        });done();  
    });
});
