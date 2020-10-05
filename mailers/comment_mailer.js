const nodemaier = require('../config/nodemailer');
exports.newComment = (comment)=>{
    console.log("New COmment is working");
    nodemaier.transporter.sendMail({
        from:"ENTER_EMAIL_ID",
        to:comment.user.email,
        subject:"Socail Elite",
        html:'<h1>Say hello to my little friend</h1>'
    },(err,info)=>{
        if(err)
        {
            console.log("Error in sending mail :: ",err);
            return;
        }
        console.log("Mail sent :: ",info);
    });
}