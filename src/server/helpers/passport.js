const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;;
const auth = require('../config/auth.js');

module.exports = function(passport, helpers) {
  
  passport.use(new FacebookStrategy({
    clientID: auth.facebookAuth.clientID,
    clientSecret: auth.facebookAuth.clientSecret,
    callbackURL: auth.facebookAuth.callbackURL, 
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, function(accessToken, refreshToken, profile, cb) {

    helpers.oAuthSignin(profile, accessToken, function(user) {
      return cb(null, user);
    });
  }));

  passport.use(new GoogleStrategy({
    clientID: auth.googleAuth.clientID,
    clientSecret: auth.googleAuth.clientSecret,
    callbackURL: auth.googleAuth.callbackURL, 
  }, function(accessToken, refreshToken, profile, cb) {
    
    helpers.oAuthSignin(profile, accessToken, function(user) {
      return cb(null, user);
    });
  }));
 

  passport.serializeUser(function(user, cb) {
    // console.log('USERRRRRR', user);
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    // console.log('deserializeeeee', obj);
    cb(null, obj);
  });
}