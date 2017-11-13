'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    title: {
      type:DataTypes.STRING,
      allowNull: false, 
       },
  },
  {
    roleId: {
      type:DataTypes.INTEGER,
      allowNull: false, 
       },
  } ,{
    classMethods: {
      associate: (models)=> {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Role;
};