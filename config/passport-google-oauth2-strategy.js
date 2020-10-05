const passport = require('passport');
const crypto = require('crypto');
const User = require("../models/user_schema");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
  clientID: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
  callbackURL: "http://localhost:8000/user/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOne({email:profile.emails[0].value}).exec(function(err,user){
      if(err){console.log("error in google strategy-passport:: ",err);return;}
      // console.log(profile);
      if(user)
      {
          return done(null,user);
      }else{
          User.create({
              name:profile.displayName,
              email:profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex')
          },function (err,user) {
              if(err){console.log("Error in crating user Google Auth :: ",err);return;}
              return done(null,user);
          });
      }
  });
}

));
module.exports = passport;