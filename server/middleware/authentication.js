const User = require('../models/user')
let jwt= require('jsonwebtoken');


 let authenticate=(req, res, next)=>{
    // find the user
  User.findOne({
    username: req.body.username
  }).then( user=> {
      if(!user){
        res.status(400).send("No aunthentication, User not found")
      }
      //checking if password matches
      else if (user){
       if(user.password != req.body.password){
        res.status(400).send("No aunthentication, Wrong password")
      }
      // if user is found and password is right
        // create a token with only our given payload
        else{
          let password= user.password 
        
          let token = jwt.sign(password, myTokenSecret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });
          res.send({
            token: token
          });
        
        } 
    }next();
  })
}

module.exports = { authenticate };