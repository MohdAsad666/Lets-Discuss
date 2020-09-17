const { Passport } = require('passport');
const passport = require('passport');
const User = require("../models/user_schema");
const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy(
    {
    usernameField:'email'
    },
    function(email,password,done)
    {
        User.findOne({email:email},function(err,user)
        {
            if(err)
            {
                console.log("Error in Finding User");
                return done(err);
            }
            if(!user||user.password!=password)
            {
                console.log("Invalid UserName password");
                return done(null,false);
            }
            return done(null,user);
        });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      if(err)
      {
        console.log("Error in finding user Log-in again");
        return done(err);
      }
      return done(null,user);

    });
});

passport.checkAuthentication = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/user/sign-in');
}

passport.setAuthentication = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;