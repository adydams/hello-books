'use strict';
module.exports = (sequelize, DataTypes) => {
  var favoriteBooks = sequelize.define('favoriteBooks', {
    bookId: {
      type:DataTypes.INTEGER,
      allowNull: false, 
      unique: true
      },
    userId:{
      type:DataTypes.INTEGER,
      allowNull: false, 
      unique: true
      },
  }, {
    classMethods: {
      associate: (models)=> {
        // associations can be defined here
        favoriteBooks.belongsTo(models.User),{
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        }
      }
    }
  });
  return favoriteBooks;
};