'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    bookTitle: {
      type:DataTypes.STRING,
      allowNull: false, 
      unique: true
      },
    author: {
      type:DataTypes.STRING,
      allowNull: false
      },
    isbn:{
      type:DataTypes.STRING,
      allowNull: false, 
      unique: true
      },
    bookSummary: {
      type:DataTypes.STRING,
      allowNull: false
      },
    quantity: {
      type:DataTypes.STRING,
      allowNull: false
      },
  }, {
    classMethods: {
      associate: (models)=> {
        // associations can be defined here
        Book.hasMany(models.UserBorrowedBooks,{
          foreignKey:'bookId'  
        });
      }
    }
  });
  return Book;
};