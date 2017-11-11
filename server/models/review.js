'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {
    userId:{
      type:DataTypes.INTEGER,
      allowNull: false, 
      unique: true
      },
    bookId:{
      type:DataTypes.INTEGER,
      allowNull: false, 
      unique: true
      },
    comment:{
      type:DataTypes.STRING,
      allowNull: false, 
      unique: true
      },
  }, {
    classMethods: {
      associate: (models)=> {
        // associations can be defined here
        review.belongsTo(models.User),{
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        }
      }
    }
  });
  return review;
};