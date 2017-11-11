const User = require('../models/index').User;
const Book = require('../models/index').Book;
const review = require('../models/index').review;

module.exports = {

    bookReview(req, res){
        let userId = req.params.userId
        let bookId = req.params.bookId

        return User
             .find({where:{id: req.params.userId}})
                 .then(user =>{
                 //  checking if users exist

                     if(!user){
                         return res.status(404).send({message:' User not found!!'}) 
                     }
                     return Book
                     //  checking if book exist
                         .find({where:{id: req.params.bookId}})
                             .then( book=>{
                                 if(!book){
                                     return res.status(404).send({message:'Book not found!!'})
                                 }
                                 //  checking if thesame book has not been marked as favorite
                                     return review
                                        .create({
                                            bookId: req.params.bookId,
                                            userId: req.params.userId,
                                            comment: req.body.comment
                                        })
                                        .then((bookReview)=>{
                                            return res.status(200).send(bookReview)
                                        }).catch((error)=>{res.status(400).send(error)})
                             })
                     
                 })
    }

}
