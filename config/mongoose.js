const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/SocialElite");
const db = mongoose.connection;
db.on("Error",console.error.bind("Problem in connecting to DataBase"));
db.once("open",function(err)
{
    if(err)
    {
        console.log("Error in connecting to DATABASE");
        return;
    }
    console.log("Connected to DB");
});

module.exports = db;