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

// Render club data
function club(req, res, next) {
  var id = req.params.id;
  
  db.collection('clubs').findOne({
    _id: mongo.ObjectID(id)
  }, done);
  
  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('myclub.pug', {data: data});
    }
  }
}

module.exports = club;