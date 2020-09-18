const Post = require("../models/post_schema");

module.exports.create = function(req,res)
{
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post)
    {
        if(err)
        {
            console.log("Error In Creating Post :: ",err);
            return;
        }
        return res.redirect('/');
    })
}