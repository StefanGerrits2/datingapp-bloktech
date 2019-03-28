var mongo = require('mongodb');

// Database information
var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
});

// Check login
function checkLogin(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  db.collection('profiles').findOne({
    username: username,
    password: password
  }, done);
  
  function done(err, user) {
    if(err) {
      res.json(err);
    }
    if (user){
      req.session.user = user;
      console.log(user);
      res.render('index.pug', {
        id: user._id,
        username: user.username
      });
    }
    else {
      res.status(401).send('Uw inloggegevens kloppen niet! Probeer het opnieuw.');
    }
  }
}

module.exports = checkLogin;