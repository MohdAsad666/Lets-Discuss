const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_workers');
const commentMailer = require('../mailers/comment_mailer');
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
            comment = await comment.populate('user','name email').execPopulate();
            // commentMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log("Error in sending to the queue :: ",err);
                    return;
                }
                console.log('Job enqueued',job.id);
            });
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