const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');
module.exports.create = function(req,res)
{
    Post.findById(req.body.post,function(err,post)
    {
        if(err)
        {
            console.log("Error in Posting Comment");
            return;
        }
        else if(!post)
        {
            console.log("Post doesn't exist");
            return;
        }
        if(post)
        {
            Comment.create({
                comment:req.body.comment,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                {
                    if(err)
                    {
                        console.log("this is err::",err);
                    }
                    post.comments.push(comment);
                    post.save();

                    
                }
                return res.redirect('/');
            });
                }
                
           
    });
}