'use strict';

const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const passport = require('passport');
const oauth_passport = require('./helpers/passport.js')(passport);

const app = express();

const PORT = process.env.PORT || 8000;

const URI = process.env.callbackURL ? process.env.MONGODB_URI : 'mongodb://localhost/tangent';
mongoose.connect(URI);

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
