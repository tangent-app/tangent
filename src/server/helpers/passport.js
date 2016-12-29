// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const auth = require('../config/auth.js');

module.exports = function(passport) {
  
  passport.use(new FacebookStrategy({
    clientID: auth.facebookAuth.clientID,
    clientSecret: auth.facebookAuth.clientSecret,
    callbackURL: auth.facebookAuth.callbackURL, 
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log('accessToken', accessToken, refreshToken, profile)
    return cb(null, profile);
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