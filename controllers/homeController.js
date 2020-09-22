const User = require('../models/user_schema');
const  Post = require('../models/post_schema');
module.exports.homepage = async function(req,res)
{
    try {
        let posts = await Post.find({}).sort('-createdAt').populate('user').populate({
            path:'comments',
            populate:({
                path:'user'
            })
        });

        return res.render("homepage.ejs",{
            title:"Home",
            posts:posts
        });
    } catch (error) {
        console.log("Error :: ",error);
    }
}