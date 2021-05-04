const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require("express");
const checkx = 0;
class SingnupController{
    signup(req,res)
    {
        res.render('signup');
    }
    store(req, res)
    {
        if(req.body.password == req.body.pwrepeat)
        {
       bcrypt.hash(req.body.password,10,function(err,hashedPass){
           if(err){
               res.json({
                   error: err
               })
           }
           let user = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        user.save()
        .then(user =>{
            res.json({
                message: "User Added Sucessfully"
            })
        })
        .catch(error => {
            res.json({
                message:"An error occured!"
            })
        })
        
       })
    }
    else{
        res.redirect('/signup');
    }
}

}

module.exports = new SingnupController;