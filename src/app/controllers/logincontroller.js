//const { render } = require("node-sass");
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
        res.redirect('/homeprivate');
        }
        catch(error)
        {
        res.render('login');
        }
    }
    login(req,res, next){
        res.render('login');
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
                        let token = jwt.sign({name:user.email},'verySecretValue',{expiresIn:'1h'})
                        getcookie.setCookie(req, res, 'token', token);
                        console.log('cookie', req.cookies.token);
                        res.redirect('/homeprivate')             
                    }
                    else
                    {
                        res.render('login');
                    }
                })
            }
            else
            {
                res.json({message: 'Invalid email'});
            }
        })
    }
}

module.exports = new LoginController;