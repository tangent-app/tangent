'use strict';

const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const passport = require('passport');
const helpers = require('./helpers/helpers');
const oauth_passport = require('./helpers/passport.js')(passport, helpers);
const Users = require('./models/users');

const app = express();

const PORT = process.env.PORT || 8000;

const URI = process.env.callbackURL ? process.env.MONGODB_URI : 'mongodb://localhost/tangent';
mongoose.connect(URI);

/* Remove user data */
// Users.remove({}, function(err, user) {
//   console.log('users removed');
// });

// Users.find({}, function(err, users) {
//   console.log('users', users);
// })

/* Add AP Lang Data */
const APLang = require('./models/ap.lang');
const langData = require('../sample-data/ap-lang-questions.json');

// APLang.remove({}, function(err, x) {
//   console.log('x', x);
// });
// langData.forEach(function(data) {
//   APLang.create({
//     question_name: data.question_name,
//     text: data.text,
//     question: data.question,
//     type: data.type,
//     difficulty: data.difficulty,
//   }, function(err, res) {
//     console.log(res);
//   });
// });

// APLang.find({}, function(err, data) {
//   console.log(data);
// });


app.use(express.static(__dirname + '../../client'));
app.use(morgan('combined'));
app.use(require('cookie-parser')());
app.use(parser.urlencoded({ extended: true}));
app.use(parser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, function() {
  console.log('Express server running on port ' + PORT);
});

routes(app, passport);

app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
});
