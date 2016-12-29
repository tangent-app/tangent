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

  oAuthSignin: function(data, cb) {
    Users.findOne( { oauth_id: data.id }, function(err, user) {
      if(err) return console.error(err);

      let first_name = data.displayName.split(" ")[0];
      let last_name = data.displayName.split(" ")[1];
      // console.log('USERRRRR', user)
      if(!user) {
        Users.create({
          oauth_id: data.id,
          first_name: first_name,
          last_name: last_name,
          email: data.emails[0].value
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
  }
};