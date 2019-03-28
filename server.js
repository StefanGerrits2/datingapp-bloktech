//Init app
const port = 3000;
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var mongo = require('mongodb');
var session = require('express-session');

require('dotenv').config();

// Database information
var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
});

// Require controllers
const checkLogin = require('./controllers/checkLogin.js');
const profile = require('./controllers/profile.js');
const logout = require('./controllers/logout.js');
const club = require('./controllers/club.js');
const add = require('./controllers/add.js');
const remove = require('./controllers/remove.js');

// Routes
app
  .set('view engine', 'pug') // Middleware at the top so it knows which template will be used
  .use(ignoreFavicon) // Source: https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
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

// Render login page
function login (req, res) {
  res.render('login.pug');
}

// Render home page
function home (req, res) {
  res.render('index.pug');
}

// Ignore favicon, Source: https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
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
