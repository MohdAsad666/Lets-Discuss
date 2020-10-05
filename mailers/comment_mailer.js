const nodemaier = require('../config/nodemailer');
exports.newComment = (comment)=>{
    console.log("New COmment is working");
    nodemaier.transporter.sendMail({
        from:"EMAIL_ID",
        to:comment.user.email,
        subject:"Socail Elite",
        html:comment.comment
    },(err,info)=>{
        if(err)
        {
            console.log("Error in sending mail :: ",err);
            return;
        }
        console.log("Mail sent :: ",info);
    });
}