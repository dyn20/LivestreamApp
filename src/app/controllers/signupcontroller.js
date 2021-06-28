const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require("express");
const checkx = 0;
class SingnupController{
    signup(req,res)
    {
        res.render('signup.hbs');
    }
    store(req, res)//
    {
        User.findOne({email:req.body.email},(err,user)=>
        {
            if(user!=null)
            {
                res.json({message:'This email has been taken!'});
            }
            else
            {
                User.findOne({username:req.body.username},(err,user1)=>
                {
                    if(user1!=null)
                    {
                    res.json({message:'This username has been taken!'});
                    }
                    else{
                            if(req.body.password == req.body.pwrepeat)
                            {
                                bcrypt.hash(req.body.password,10,function(err,hashedPass){
                                    if(err){
                                        res.json({
                                            error: err
                                        })
                            }
                            let user = new User ({
                                fullname: req.body.fullname,
                                username: req.body.username,
                                email: req.body.email,
                                password: hashedPass
                            })
                            user.save()
                            .then(user =>{
                                res.redirect('/login');
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
                })
            }
        })
}

}

module.exports = new SingnupController;