var mongo = require('mongodb');

// Database information
var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
});

// Delete a club
function remove(req, res, next) {
  var id = req.params.id;

  db.collection('clubs').deleteOne({
    _id: mongo.ObjectID(id)
  }, done);

  function done(err) {
    if (err) {
      next(err);
    } else {
      res.json({status: 'ok'});
    }
  }
} // Used source ends here

module.exports = remove;