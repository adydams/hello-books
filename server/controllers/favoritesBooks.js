const User = require('../models/index').User;
const Book = require('../models/index').Book;
const favoriteBook = require('../models/index').favoriteBooks;

module.exports =  {
        markFavoriteBook(req, res){
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
                                        return favoriteBook
                                            .find(
                                                {where:
                                                    {
                                                        bookId: req.params.bookId,
                                                        userId: req.params.userId
                                                    }
                                            })
                                            .then( favoritebook=>{
                                                if(favoritebook){
                                                    return res.status(400).send({message: 'This has been marked as your favorite book before'})
                                                }
                                                //  creaing new favorite book
                                                return favoriteBook
                                                    .create({
                                                        bookId: req.params.bookId,
                                                        userId: req.params.userId
                                                    })
                                                    .then(
                                                        res.status(200).send({message:'Favorite book marked'})
                                                    )
                                                    .catch((error)=> { res.status(400).send(error)})
                                                })
                                                .catch((error)=> { res.status(400).send(error)})
                                            
                                })
                        
                    })
                    
        }, 
  
        //getting a list of users favorite bookss
        getUserFavoriteBook(req, res){
            return User
                .find({where:{id: req.params.userId}})
                    .then( user =>{
                        if(!user){
                            return res.status(404).send({message:'User not found'})
                        }

                        return favoriteBook
                            .find({where:{id: req.params.userId}})
                                .then( favoritebook=>{
                                    
                                    return res.status(200).send( favoritebook)                                                                         
                                })
                    })

        }
}