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

// Add input to database, used source: https://github.com/cmda-bt/be-course-18-19/blob/master/examples/mongodb-server/index.js
function add(req, res, next) {
  db.collection('clubs').insertOne({
    club: req.body.club,
    time: req.body.time,
    description: req.body.description
  }, done);
  
  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect('/' + data.insertedId);
    }
  }
}

module.exports = add;