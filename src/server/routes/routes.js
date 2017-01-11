'use strict';

var helpers = require('../helpers/helpers');

module.exports = function(app, passport) {

  app.get('/login/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }),
  // function(req, res) {
  //   helpers.oAuthSignin(req.user, function(data) {
  //     if(data) res.redirect('/profile');
  //   });
  // });
  app.get('/login/facebook/return', passport.authenticate('facebook', 
    { 
      // successRedirect : '/auth/facebook/login', 
      failureRedirect : '/',
      failureFlash : true
    }
  ), function(req, res) {
    res.redirect('/profile');
  });

  app.get('/login/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));
  
  app.get('/login/google/return', passport.authenticate('google', {
      failureRedirect : '/',
      failureFlash : true
    }
  ), function(req, res) {
    res.redirect('/profile');
  });
  



  app.get('/api/profile', function(req, res) {
    if(!req.user) {
      res.json(false);
    }
    else {
      let data = {
        _id: req.user._id,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        token: req.user.token
      };

      res.json(data);
    }
    
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

  app.get('/api/checklogin', function(req, res) {
    console.log('check login route', req.user);
    if(req.user) {
      helpers.checkLogin(req.user, function() {

      });
    } else {
      res.end();
    }
  });
 
}

