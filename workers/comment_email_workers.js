const queue = require('../config/kue');
const commentMailer = require('../mailers/comment_mailer');
queue.process('emails',function(job,done){
    console.log("Queue is processing a job :: ",job.data);
    commentMailer.newComment(job.data);
    done();
});