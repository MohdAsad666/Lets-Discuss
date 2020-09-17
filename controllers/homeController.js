const User = require('../models/user_schema');
module.exports.homepage = function(req,res)
{
    return res.render("homepage.ejs",{
        title:"Home"
    });
}