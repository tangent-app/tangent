'use strict';

var helpers = require('../helpers/helpers');

module.exports = function(app, passport) {

  app.get('/login/facebook', passport.authenticate('facebook', { scope : 'email' }));

  app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {

    helpers.oAuthSignin(req.user, function(data) {
      if(data) res.redirect('/profile');
    });
  });

  // app.get('/profile', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res){
  //   console.log('asdfasdfdsfd');
  //     res.redirect('/');
  // });
  
  // function loggedIn(req, res, next) {
  //   if (req.user) {
  //       next();
  //   } else {
  //       res.redirect('/login');
  //   }
  // }

  // app.get('/profile', loggedIn, function(req, res, next) {
  //   console.log('reqqqqqqq user', req.user);
  //   res.end();
   
  // });

  app.get('/api/profile', function(req, res) {
    res.json(req.user);
  });

  app.get('/api/signin', function(req, res) {
    // var username = req.body.data.username;
    // var password = req.body.data.password;
    
    new Promise(function(resolve, reject) {
      resolve(helpers.signIn());
    })
    .then(function(data) {
      // console.log('ressss', data);
      res.json(data);
    });

  });
 
}

