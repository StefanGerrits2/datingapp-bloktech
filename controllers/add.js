var mongo = require('mongodb');

// Database information
var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
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