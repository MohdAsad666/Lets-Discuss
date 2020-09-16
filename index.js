const express = require('express');
const port = 8000;
const app = express();
const passport = require('passport');
const db = require("./config/mongoose");
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set('view engine', 'ejs');
app.set('views','./views');
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