'use strict';

const helpers = require('../helpers/helpers');

module.exports = function(app, passport) {

  app.get('/login/facebook', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/login/facebook/return', passport.authenticate('facebook', 
    { 
      failureRedirect : '/',
      failureFlash : true
    }
  ), function(req, res) {
    res.redirect('/profile');
  });

  app.get('/login/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));
  
  app.get('/login/google/return', passport.authenticate('google', 
    {
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
        _id: req.user.user._id,
        email: req.user.user.email,
        first_name: req.user.user.first_name,
        last_name: req.user.user.last_name,
        token: req.user.token
      };
      res.json(data);
    }
    
  });

  app.post('/api/signin', function(req, res) {
    console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;
    
    helpers.signIn({ email: email, password: password }, function(data) {
      res.json(data);
    });

  });

  app.post('/api/signup', function(req, res) {
    helpers.signUp(req.body, function(data) {
      res.json(data);
    });
  });

  app.get('/api/checklogin', function(req, res) {
    if(req.user) {
      helpers.checkLogin(req.user, function() {

      });
    } else {
      res.end();
    }
  });
 
  app.post('/api/subject/:name', function(req, res) {
    let email = req.body.email;
    helpers.getMaterial(email, function(data) {
      res.json(data);
    });
  });

  app.post('/api/subject/:name/:questionname', function(req, res) {
    let questionName = req.params.questionname;
    let subject = req.params.name;
    let questionData = req.body;

    helpers.updateUserMaterial(questionData, subject, questionName, function(data) {
      res.json(data);
    });
  });
}

