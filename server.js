//Init app
const port = 3000;
const express = require('express');
const app = express();

var slug = require('slug');
var bodyParser = require('body-parser');

var find = require('array-find');

var mongo = require('mongodb');

require('dotenv').config();

var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, function (err, client) {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
});


// Routes
app
  .set('view engine', 'pug') // Middleware at the top so it knows which template will be used
  .use(bodyParser.urlencoded({extended: true}))
  .use('/static', express.static('static'))
  .get('/', index)
  .get('/profile', profile)
  .get('/matches', matches)
  .get('/inbox', inbox)
  .get('/search', search)
  .get('/add', form) // Add a club form
  .get('/:id', club) // Renders data at new page
  .post('/', add);

function index (req, res) {
	res.render('index.pug');
}
function profile (req, res) {
	res.render('profile.pug');
}
function matches (req, res) {
  res.render('matches.pug');
}
function inbox (req, res) {
	res.render('inbox.pug');
}
function search (req, res) {
	res.render('search.pug');
}
function form(req, res) {
  res.render('add.pug');
}

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

// Form
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
      res.redirect('/myclub' + data.insertedId);
    }
  }
}

// 404 error
app.use(function notfound(req, res){
  res.status(404);

  // Respond with html page
  if (req.accepts('html')) {
    res.render('notfound.pug');
    return;
  }
});

// Confirm message
app.listen(port, message());

function message(){
  console.log('Datingwebsite listening on port ' + port + ' !');
}



