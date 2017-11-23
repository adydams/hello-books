'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        is: /^[a-z0-9\_\-]+$/i,
      }
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        is: /^[a-z0-9\_\-]+$/i,
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        isEmail: true
      }
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mobileNumber:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models)=> {
        // associations can be defined here
        User.hasMany(models.UserBorrowedBooks, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'  
        });
        User.belongsTo(models.Role,{
          foreignKey: 'roleId',
          onDelete: 'CASCADE'  
        });
        User.hasMany(models.favoriteBooks, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'  
        });
        User.hasMany(models.review, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'  
        });
      }
    }
  });
  return User;
};
// User.statics.findByToken = ((email, password)=>{
//       return findOne({email}).then((user)=>{
//           if(!user){
//             return 
//           }

//       })
// })
