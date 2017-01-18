'use strict';

const Users = require('../models/users');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const secret = process.env.secret || 'hollabackyounginwootwoot';

module.exports = {
  signIn: function(username, pw) {
    return 'asdfsadfsaf';
    // Users.findOne({username: username}, function(err, user) {
    //   if(err) return console.error(err);

    //   return 'testing';
    // });
  },

  signUp: function(data, cb) {
    let password = data.password;

    Users.findOne( { email: data.email }, function(err, user) {
      if(user) {
        console.log('email already exists');
        return cb(true)
      } else {
        
        hash(password, function(err, hash) {
          Users.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: hash,
            token: tokenizer({
              email: data.email
            })
          }, function(err, data) {
            return cb(data);
          });
        });
      }
    });
    
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
  },

};

const hash = function(password, cb) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, null, cb);
  });
};

const tokenizer = function(user) {
  return jwt.sign(user, secret, { expiresIn: 600000 });
};