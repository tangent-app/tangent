var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var APLang = new Schema({
  question_name: String,
  text: String,
  question: String,
  type: String,
  difficulty: String,
});

module.exports = mongoose.model('APLang', APLang);