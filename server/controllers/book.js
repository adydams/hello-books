const Book = require('../models/index').Book;

module.exports ={
    //creating books that do not exist
    books(req, res) {
        return Book
            .findOne({
                where:{
                    bookTitle: req.body.bookTitle
                }
            }).then( book=>{
                if (book){
                    return res.status(400).send({message: 'Book title already exist'})
                }
                return Book
                    .create({
                        bookTitle: req.body.bookTitle,
                        author: req.body.author,
                        isbn: req.body.isbn,
                        bookSummary: req.body.bookSummary,
                        quantity: req.body.quantity,
                    })
                    .then((book)=>{
                        res.status(200).send({mesage: book.bookTitle+' Succesfully recorded'})
                    })
                    .catch((error)=>{res.status(400).send(error)})
            })
            .catch((error)=>{res.status(400).send(error)})
    },
    //updating existing books
     put(req, res) {

        let bookId = req.params.bookId 
        return Book
            .find( {where:{id:bookId}})     
            .then( book =>{
                if (!book){
                    return res.status(404).send({message: 'Book does not exist in record ' })
                }
                return book
                    .update({
                        bookTitle: req.body.bookTitle,
                        author: req.body.author,
                        isbn: req.body.isbn,
                        bookSummary: req.body.bookSummary,
                        quantity: req.body.quantity,
                    })
                    .then((book)=>{
                        res.status(200).send({message: book.bookTitle+ ', successfully updated'})
                    })
                    .catch((error)=>{ res.status(400).send(error)})
            })  .catch((error)=>{ res.status(400).send(error)})

     }, 
     //listing all books
     list(req, res) {
        return Book
            .all()
                .then((book)=>{
                    res.status(200).send(book)
                })
                .catch((error)=>{res.status(400).send(error)})
     }
}






































