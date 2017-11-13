const User = require('../models/index').User;
const userBorrowedBooks = require('../models/index').UserBorrowedBooks;
const Book = require('../models/index').Book;

module.exports = {
    // routes for signed in user to borrow books
    returnBorrowedBook (req, res){
        let userId = req.params.userId
        let bookId = req.params.bookId
        //ensured user exist   
        return User
                .find({where:{id: userId}})
                     .then((user)=>{
                         if(!user){
                                return res.status(404).send({message: 'User not found' })
                            }
                           else{
                                return userBorrowedBooks
                                    .find({
                                        where:{
                                        userId: req.params.userId,
                                        bookId: req.params.bookId
                                        }
                                    }).then( userborrowedbooks=>{
                                        if(!userborrowedbooks){
                                            return res.status(404).send({message: 'You have not borrowed this book you want to return ' })
                                        }
                                        else{
                                            //deleting a returned book from borrower's list
                                            return userborrowedbooks    
                                                .destroy({
                                                     where:{
                                                     userId: req.params.userId,
                                                     bookId: req.params.bookId
                                                    }
                                                })
                                            }
                                        })
                                         .then(()=>{
                                        
                                                     //adding quantity of returned book +1
                                                return Book
                                                .find({where: {id : bookId}})   
                                                    .then(book=>{
                                                    return book
                                                        .update({quantity: (book.quantity+1)})
                                                  .then(book=>{
                                                  return  res.status(200).send({message: 'You have just returned '+ book.bookTitle})
                                                  })
                                                })
                                            })
                                        }
                                    }).catch((error)=>{res.status(404).send({message: 'user not found'})})
                                                          
                        }
               
}