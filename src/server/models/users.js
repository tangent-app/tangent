var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String,
  oauth_id: String,
  subjects: {
    subject: {
      name: String,
      reviewed: Array
    }
  }
});

module.exports = mongoose.model('Users', Users);