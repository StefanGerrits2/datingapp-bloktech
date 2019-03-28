var mongo = require('mongodb');

// Database information
var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
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