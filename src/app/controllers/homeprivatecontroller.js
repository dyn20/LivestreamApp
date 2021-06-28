const User = require("../models/user");
const roomID = require("../models/roomid");
const {uid} = require('uid');

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
                res.render('profile.hbs',{username:user.username,email:user.email,fullname:user.fullname});
        })
    }
    editProfile(req,res)
    {
        if(req.cookies.email)
            {
            User.findOne({email:req.cookies.email},(err,user)=>
            {
                if(user!=null)
                    res.render('editprofile',{username:user.username,email:user.email,fullname:user.fullname});
            })
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
        else
        {
            res.json({message:'You need to login to access this page!'});
        }
    }
    join(req,res)
    {
        if(req.cookies.token)
        {
            const id = req.body.idroom;
            var nickname = req.body.nickname;
            if(nickname=='')
            {
                nickname = req.cookies.username;
            }
            console.log(id);
            roomID.findOne({IDroom:id},(err,roomID)=>
            {
                if(roomID!=null)
                {
                    res.cookie('roomid',id,{maxAge: 36000000});
                    res.cookie('nickname',nickname,{maxAge: 36000000});
                    res.redirect('/Livestream');
                    
                }
                else
                {
                    res.json({message:'Invalid ID room!'});
                }
                    
            })
        }
        else
        {
            res.join({message:'You must be login to access this page!'});
        }
    }
    create(req,res)
    {
        if(req.cookies.token)
        {
            var id = uid(10);
            var nickname = req.body.nickname;
            if(nickname=='')
            {
                nickname = req.cookies.username;
            }
            roomID.findOne({IDroom:id},(err,roomId)=>
            {
                while(roomId!=null)
                {
                    id = uid(10);
                }
                   
            })
            let roomId = new roomID({
                    Admin:req.cookies.email,
                    IDroom:id,
                })
                roomId.save();
                res.cookie('roomid',id,{maxAge: 36000000});
                res.cookie('nickname',nickname,{maxAge: 36000000});
                res.redirect('/Livestream');
                
        }
        else
        {
            res.join({message:'You must be login to access this page!'});
        }
        
    }
    ShowSomethingAbout(req,res)
    {
        res.render('about.hbs');
    }
}

module.exports = new PrivateController;