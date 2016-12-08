var helpers = require('../helpers/helpers');

module.exports = function(app, express) {
  app.get('/api/signin', function(req, res) {
    console.log('here');
    // var username = req.body.data.username;
    // var password = req.body.data.password;
    
    var result = new Promise(function(resolve, reject) {
      resolve(helpers.signIn());
    });

    result.then(function(data) {
      console.log('ressss', data);
      res.json(data);
    });
  });
 
}

