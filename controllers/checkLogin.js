var mongo = require('mongodb');

// Database information
// Database information
let db = {
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  cluster: process.env.DB_CLUSTER,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
};
const url = `mongodb+srv://${db.username}:${db.password}@${db.cluster}-${db.host}/${db.name}`;

mongo.MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
  if (err) {
    console.log('Sorry, connection failed', err);
  } else {
    db = client.db(process.env.DB_NAME);
  }
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