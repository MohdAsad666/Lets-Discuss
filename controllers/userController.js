const express = require('express');
const path = require('path');
const fs = require('fs');
const User = require("../models/user_schema");

module.exports.profile = async function(req,res)
{
    let user = await User.findById(req.params.id);
    try {
        if(user)
        {
            return res.render('profile',{title:"Profile",user:user});
        }
    } catch (error) {
        console.log("Error :: ", error);
        return;
    }
}
module.exports.signUp = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    else{
    return res.render("sign-up.ejs",{title:"Sign Up"});
    }
}
module.exports.signIn = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    else
    {
    return res.render("sign-in.ejs",{title:"Sign In"});
    }
}
module.exports.create = function(req,res)
{
    if(req.body.password!=req.body.confirm_pasword)
    {
        return res.redirect("/");
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log("Error in creating account");
            return;
        }
        
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log("Error in Creating Account:: ",err);
                    return;
                }
                return res.redirect('/user/sign-in');
            });
        }
        else{
            console.log("User Exist In DB try Sign-in");
            return res.redirect('/user/sign-in');
        }

    });
    
}
module.exports.createSession = function(req,res)
{
    return res.redirect('/');
}
module.exports.destroySession = function(req,res)
{
    req.logout();
    return res.redirect('/');
}

module.exports.updateUser = async function(req,res)
{
    if(req.user.id==req.params.id)
    {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err)
                {
                    console.log("Error in Uploading file:: ",err);
                }
                user.name = req.body.name;
                user.password = req.body.password;
                user.email = req.body.email;
                if(req.file)
                {
                    if(fs.existsSync(path.join(__dirname,'..',user.avatar))) {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                console.log(req.file);
                user.save();
                return res.redirect('back');
            });
        } catch (error) {
            return res.status(401).send('Unauthorized');
        }        
    }
}