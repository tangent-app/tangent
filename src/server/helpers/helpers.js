'use strict';

var Users = require('../models/users');

module.exports = {
  signIn: function(username, pw) {
    return 'asdfsadfsaf';
    // Users.findOne({username: username}, function(err, user) {
    //   if(err) return console.error(err);

    //   return 'testing';
    // });
  },

  oAuthSignin: function(data, token, cb) {

    let email = data.emails[0].val;

    Users.findOne( { email: email }, function(err, user) {
      if(err) return console.error(err);

      let first_name = data.displayName.split(" ")[0];
      let last_name = data.displayName.split(" ")[1];
      
      if(!user) {
        Users.create({
          oauth_id: data.id,
          first_name: first_name,
          last_name: last_name,
          email: data.emails[0].value,
          token: token
        }, function(err, data) {
          if(err) return console.error(err);
          else return cb(data);
        });
      }

      else {
        return cb(user);
      }

    });
  },

  getProfile: function(data, cb) {
    Users.findOne( { email: data.emails[0].value }, function(err, user) {
      if(err) return console.error(err);
      else return cb(user);
    });
  },
  checkLogin: function(data, cb) {
    console.log('userrrr', data);
    users.findOne( { email: data.emails[0].value }, function(err, user) {
      if(user.token) {
        
      }
    });
  }
};