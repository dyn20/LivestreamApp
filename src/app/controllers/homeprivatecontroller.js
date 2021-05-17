const user = require("../models/user");
const User = require("../models/user");
class PrivateController{
    home(req,res){
        if(req.cookies.token)
            res.render('homeprivate.hbs');
        else
            res.json({message:'You need to login to access this page!'});
    }
    profile(req,res){
        User.findOne({email:req.cookies.email},(err,user)=>
        {
            if(user!=null)
                res.render('profile.hbs',{username:user.username,email:user.email,fullname:user.fullname,phonenumber:user.phonenumber});
        })
    }
    editProfile(req,res)
    {
        res.render('editprofile.hbs');
        const phone = req.body.phonenumber;
        const username = req.body.username;
        const fullname = req.body.fullname;
        User.findOne({email:req.cookies.email},(err,user)=>{
            if(user!=null)
            {
                if(phone)
                {
                    user.phonenumber = phone;
                }
                if(fullname)
                {
                    user.fullname = fullname;
                }
                if(username) 
                {
                    user.username = username;
                }
                user.save();
            }
        })
    }
    EnterUsername(req,res,next)
    {
        if(req.cookies.token)
        {
            res.cookie('userlive',"");
            res.render('enterusername.hbs');
            if(req.cookies.userlive)
            {
            if(req.body.username){
                res.cookie('userlive',req.body.username)
            }
            else
                res.cookie('userlive',req.cookies.username);
            }
        }
        else
        {
            res.json({message:'You need to login to access this page!'});
        }
    }
}
module.exports = new PrivateController;