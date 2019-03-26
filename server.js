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

// Database information
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
  .get('/home', home) // Home page
  .get('/profile', profile) // Profile page
  .get('/matches', matches) // Matches page
  .get('/inbox', inbox) // Inbox page
  .get('/search', search) // Search page
  .get('/myclub', myclub) // Search page
  .get('/logout', logout) // Log out
  .get('/add', form) // Add a club form
  .get('/:id', club) // Renders data at new page
  .post('/home', checkLogin) // Login, or not
  .post('/', add) 
  .delete('/:id', remove);

// Render login page
function login (req, res) {
  res.render('login.pug');
}

// Check login
function checkLogin(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  db.collection('profiles').findOne({
    username: username,
    password: password
  }, done);

  function done(err) {
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

// Log out, used source: https://www.youtube.com/watch?v=aT98NMdAXyk
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

// Render home page
function home (req, res) {
  res.render('index.pug');
}

// Render profile if logged in
function profile (req, res) {
  if(!req.session.user) {
    res.status(401).send('U moet ingelogd zijn om deze pagina te kunnen zien');
  }
  else {
    res.render('profile.pug');
  }
}

// Empty routes
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

function myclub(req, res, data) {
  res.render('myclub.pug', {data: data});
}

// Add input to database
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

// Confirm message if the server is online
app.listen(port, message());

function message(){
  console.log('Datingwebsite listening on port ' + port + ' !');
}
