const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');
module.exports.create = async function(req,res)
{
    let post = await Post.findById(req.body.post);
    try {
        if(post)
        {
            let comment = await Comment.create({
            comment:req.body.comment,
            post: req.body.post,
            user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            return res.redirect('back');        
        }
    } catch (error) {
        console.log("Error :: ",error);
        return;
    }
}
module.exports.destroy = async function(req,res)
{
    let comment = await Comment.findById(req.params.id);
        try {
            if((comment.user==req.user.id))
            {
                let postId = comment.post;
                comment.remove();
                let post =  Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
                return res.redirect('back');
            }
        } catch (error) {
            console.log("Error :: ",error);
            return;
        }
}