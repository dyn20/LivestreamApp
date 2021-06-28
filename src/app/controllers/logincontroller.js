
const LoginHistory = require("../models/login_history");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require("express");
const getcookie = require("../../utils/middleware");
class LoginController
{
    
    Loginstatus(req,res,next)
    {
        try{
        const cookie = req.cookies.token;
        const result = jwt.verify(cookie,'verySecretValue');
        if(result)
        res.redirect('/home');
        }
        catch(error)
        {
        res.render('login.hbs');
        }
    }
    login(req,res, next){
        res.render('login.hbs');
    }
    store(req,res){
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({email:email})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password,function(err, result){
                    if(err)
                    {
                        res.json({
                            error: err
                        })
                    }
                    if(result)
                    { 
                        const history = new LoginHistory(req.body);
                        history.save();
                        let token = jwt.sign({name:user.email},'verySecretValue',{expiresIn:'24h'})
                        let email=req.body.email
                        let username = user.username;
                        console.log('username', username);
                        /*getcookie.setCookie(req,res,'email',email);
                        getcookie.setCookie(req, res, 'token', token);*/
                        res.cookie('token',token,{maxAge: 36000000});
                        res.cookie('email',email,{maxAge: 36000000});
                        res.cookie('username',username,{maxAge: 36000000});
                        res.redirect('/home')   
                               
                    }
                    else
                    {
                        res.render('login.hbs');
                    }
                })
            }
            else
            {
                res.json({message: 'Invalid email!'});
            }
        })
    }
   
}

module.exports = new LoginController;