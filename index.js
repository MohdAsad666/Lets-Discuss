const express = require('express');
const port = 8000;
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("./config/passport-local");
const cookieParser = require('cookie-parser');
const db = require("./config/mongoose");
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(session({
    name:"Social-Elite",
    // Change before Deploying
    secret:"Social-Elite for now",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*10
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use("/",require("./routers"));

app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error");
        return;
    }
    console.log("Server is up and running");
});