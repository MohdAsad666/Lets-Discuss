const User = require('../models/user_schema');
const  Post = require('../models/post_schema');
module.exports.homepage = function(req,res)
{
    Post.find({}).populate('user').populate({
        path:'comments',
        populate:({
            path:'user'
        })
    }).exec(function(err,posts)
    {
        return res.render("homepage.ejs",{
            title:"Home",
            posts:posts
        });
    });
}