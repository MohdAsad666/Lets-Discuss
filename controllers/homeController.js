const User = require('../models/user_schema');
const  Post = require('../models/post_schema');
module.exports.homepage = function(req,res)
{
    // Post.find({},function(err,posts)
    // {
    //     return res.render("homepage.ejs",{
    //         title:"Home",
    //         posts:posts
    //     });
    // });
    Post.find({}).populate('user').exec(function(err,posts)
    {
        return res.render("homepage.ejs",{
            title:"Home",
            posts:posts
        });
    });
}