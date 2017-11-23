const request = require('supertest');
const expect = require('expect');
const app = require('../../app');
const { User } = require('../models/index').User;

describe('#User', () => {
    describe('User', () => {
      beforeEach((done) => { //Before each test we empty the database
          User.remove({}, (err) => { 
             done();         
          });     
      });
    });  

    describe('#Borrowing Books', () => {
        it('should check for succeful sign up', (done)=>{
             let userParams ={ 
                name: 'felicit',    
                username: 'felicit',
                password: 'pass123',
                email: 'felicit@andela.com',
                firstName:'felicit',
                lastName: 'felicit',
                roleId: 1,
                mobileNumber:'+234567890'                        
              };
              request(app)
                .post('/api/user/signup')
                .send(userParams)
                .expect(200)
                .expect((res)=>{
                  expect(res.body).toEqual('Successfully sign up');
                })
                .end((err, res)=>{
                  if(err) {
                    return done(err);
                  }
                  User.find({where:{email: 'felicit@andela.com'}}).then((user)=>{
                    expect(user.length).toBe(1);
                    expect(res.body).toInclude(user.username);
                    done();
                  }).catch((err) => { done(err); });
                });
                done();  
            });
        });

        it('should check for violation', (done)=>{
            let userParams ={ 
               name: '',    
               username: '',
               password: 'pass123',
               email: 'felicit@andela.com',
               firstName:'felicit',
               lastName: 'felicit',
               roleId: 1,
               mobileNumber:'+234567890'                        
             };
             request(app)
               .post('/api/user/signup')
               .send(userParams)
               .expect(200)
               .expect((res)=>{
                 expect(res.body).toInclude('violation');
               })
               .end((err, res)=>{
                 if(err) {
                   return done(err);
                 }
                 User.find({where:{email: 'felicit@andela.com'}}).then((user)=>{
                   expect(user.length).toBe(1);
                   expect(res.body).toInclude(user.username);
                   done();
                 }).catch((err) => { done(err); });
               });
               done();  
           });
});
      
        
       
