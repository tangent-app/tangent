'use strict';

const Users = require('../models/users');
const APLang = require('../models/ap.lang');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const secret = process.env.secret || 'hollabackyounginwootwoot';

module.exports = {
  signIn: function(data, cb) {
    Users.findOne({ email: data.email }, function(err, user) {
      if(err) return console.error(err);
      if(!user) return cb('email does not exist');
      else {
        bcrypt.compare(data.password, user.password, function(err, valid) {
          if(err) return console.error('encryption error');
          else {
            if(valid) return cb(user);
            else return cb('incorrect password');
          }
        });
      }
    });
  },

  signUp: function(data, cb) {
    let password = data.password;

    Users.findOne( { email: data.email }, function(err, user) {
      if(user) {
        console.log('email already exists');
        return cb('email already exists');
      } else {
        
        let token = tokenizer({ name: data.first_name + data.last_name, email: data.email });

        hash(password, function(err, hash) {
          Users.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: hash
          }, function(err, data) {
            return cb({ user: data, token: token });
          });
        });
      }
    });
    
  },

  oAuthSignin: function(data, token, cb) {

    let email = data.emails[0].value;

    Users.findOne( { email: email }, function(err, user) {
      if(err) return console.error(err);

      let first_name = data.displayName.split(" ")[0];
      let last_name = data.displayName.split(" ")[1];

      if(!user) {
        Users.create({
          oauth_id: data.id,
          first_name: first_name,
          last_name: last_name,
          email: email,
          token: token
        }, function(err, newData) {
          if(err) return console.error(err);
          else return cb({ user: newData, token: token });
        });
      }

      else {
        let existingUserdata = {
          oauth_id: data.id,
          first_name: first_name,
          last_name: last_name,
          email: email
        };
        return cb({ user: existingUserdata, token: token });
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
    Users.findOne( { email: data.emails[0].value }, function(err, user) {
      if(user.token) {
        
      }
    });
  },

  getMaterial: function(email, cb) {
    Users.findOne({ email: email }, function(err, user) {
      if(err) return console.error(err);
      else {
        APLang.find({}, function(err, data) {
          if(err) return console.error(err);
          else {
            
            if(user.subjects.length < 1 || !user.subjects) return cb(data);

            let reviewedData = [];

            user.subjects.forEach(function(subject) {
              subject.reviewed.forEach(function(material) {
                reviewedData.push(material.question_name);
              });
            });

            let filteredData = data.filter(function(questions) {
              return reviewedData.indexOf(questions.question_name) < 0;
            });

            return cb(filteredData);
          }


        });
      }
    });
  },

  updateUserMaterial: function(questionData, subject, question, cb) {
    let email = questionData.email;
    let answerChoice = questionData.answer;
    let category = questionData.category;
    let difficulty = questionData.difficulty;
    let questionType = questionData.type;
    let submittedTime = questionData.submitted_time;

    Users.findOne({ email: email }, function(err, user) {
      if(err) return console.error(err);
      else {

        if(user.subjects.length < 1) user.subjects.push( { subject_name: subject } );

        if(user.subjects[user.subjects.length - 1].subject_name !== subject) user.subjects.push( { subject_name: subject } );
        

        
        user.subjects.forEach(function(data) {
          if(data.subject_name === subject) {
            if(data.reviewed.length < 1) {
              data.reviewed.push({
                question_name: question, 
                answer: answerChoice,
                type: questionType,
                difficulty: difficulty,
                submitted_time: submittedTime 
              });
            } 

            if(data.reviewed[data.reviewed.length - 1].question_name !== question) {
              data.reviewed.push({
                question_name: question,
                answer: answerChoice,
                type: questionType,
                difficulty: difficulty,
                submitted_time: submittedTime
              });
            }
          }
        });
        
        user.save(function (err) {
          if(err) return console.error(err);

          else {
            return cb(user);
          } 
        });
      }
    });
  }
};

const hash = function(password, cb) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, null, cb);
  });
};

const tokenizer = function(user) {
  return jwt.sign(user, secret, { expiresIn: 600000 });
};