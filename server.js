//Init app
const port = 3000;
const express = require('express');
const app = express();

var slug = require('slug');
var bodyParser = require('body-parser');
var find = require('array-find');
var mongo = require('mongodb');
var session = require('express-session');


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
  .use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
   }))
  .get('/', login)
  .get('/home', index) // Home page
  .get('/profile', profile) // Profile page
  .get('/matches', matches) // Matches page
  .get('/inbox', inbox) // Inbox page
  .get('/search', search) // Search page
  .get('/logout', logout) // Log out
  .get('/add', form) // Add a club form
  .get('/:id', club) // Renders data at new page
  .post('/home', loggingin) // Login, or not
  .post('/', add) 
  .delete('/:id', remove);
  
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

// Login
function loggingin(req, res, next) {
  db.collection('profiles').insertOne({
    username: req.body.username,
    password: req.body.password
  }, done);

  function done(err, data) {
    if (req.body.username) {
      res.render('index.pug', {data: data});
      res.end();
    }
    else {
      res.status(401).send('Vul alstublieft uw gegevens in');
  
    }
  }
}

// Check data from login, Used source: https://www.youtube.com/watch?v=aT98NMdAXyk
function login (req, res) {
	if (req.session.username) {
    res.redirect('/logged');
  }
  else {
    res.render('login.pug');
  }
}

function logout(req, res) {
  req.session.destroy(function(err){
    if (err) {
      res.negotiate(err);
    }
    else {
      res.redirect('/');
    }
  });
}
// Source used ends here

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
      res.redirect('/' + data.insertedId);
    }
  }
}

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



