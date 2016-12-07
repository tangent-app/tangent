var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

var app = express();

var PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + '../../client'));
app.use(morgan('tiny'));
app.use(parser.urlencoded({ extended: true}));
app.use(parser.json());

app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
});

app.listen(PORT, function() {
  console.log('Express server running on port ' + PORT);
});