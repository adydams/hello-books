const User = require('../models/index').User;
const userBorrowedBooks = require('../models/index').UserBorrowedBooks;
const Book = require('../models/index').Book;


module.exports = {
    // routes for signed in user to borrow books
    borrowBooks(req, res){
       let userId = req.params.userId
       let bookId = req.params.bookId
       //finding signed up user
       return User
            .find({where:{id: userId} })
              .then((user)=>{
                  if (user){
                    //checking for existing book in the library
                      return Book
                            .find({where:{id: bookId} }) 
                              .then( book =>{
                                if(!book){
                                  
                                    return res.status(404).send({message: 'Book Not found!'})
                                  }
                                  //ensuring book is available in library
                                  else if(book && book.quantity>0) {
                                    return userBorrowedBooks
                                        .find({
                                          where:{
                                            bookId: req.params.bookId,
                                            userId: req.params.userId
                                          }
                                        })
                                          .then(userborrowedbooks=>{
                                            //ensuring you cant borrow more than one copy of the same copy
                                            if(userborrowedbooks){
                                              return res.status(404).send({message: 'You have borrowed a copy of this book before, You are not allowed to borrow it again'})
                                            }
                                            return userBorrowedBooks
                                                .create({
                                                    userId: req.params.userId,
                                                    bookId: req.params.bookId,
                                                    borrowedDate: new Date(),
                                                    returnedDate: new Date().getDay()+7,
                                                }).then((userborrowedbook)=>{ 
                                                    if(userborrowedbook){
                                                        return Book
                                                            .find({where: {id : bookId}})    
                                                              .then(book=>{
                                                         //deducting quantity of borrowed book by 1
                                                                return book
                                                                .update({quantity: (book.quantity-1)})
                                                                  .then(book=>{
                                                                    res.status(200).send({message: 'You have just borrowed '+ book.bookTitle})
                                                                  })
                                                               })
                                                        }
                                                    })                                                                                                 
                                  })
                                  }
                                  else return res.status(404).send({message: 'Book is presently unavailable'})

                              })
                              .catch((error)=>{res.send(error)})  
                  }
                  return res.status(404).send({message: 'User does not exist'})
                        
              }).catch((error)=>{res.status(400).send(error)})
    }

}