'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserBorrowedBooks = sequelize.define('UserBorrowedBooks', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:true
    },
    bookId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:true
    },
    borrowedDate: {
      type: DataTypes.DATE
    },
    returnedDate:{
       type: DataTypes.DATE
      }
  }, {
    classMethods: {
      associate: (models)=> {
        // associations can be defined here
        UserBorrowedBooks.belongsTo(models.User, {
          foreignKey: 'userId',
        });
        UserBorrowedBooks.belongsTo(models.Book,{
          foreignKey: 'bookId'
        });
      }
    }
  });
  return UserBorrowedBooks;
};