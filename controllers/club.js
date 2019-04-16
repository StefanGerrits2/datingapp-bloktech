var mongo = require('mongodb');

// Setup database
let db = require('../models/db.js');

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