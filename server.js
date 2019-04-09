//Init app
const port = 3000;
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var mongo = require('mongodb');
var session = require('express-session');
var favicon = require('serve-favicon');
var path = require('path');

require('dotenv').config();

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

// Require controllers
const checkLogin = require('./controllers/checkLogin.js');
const profile = require('./controllers/profile.js');
const logout = require('./controllers/logout.js');
const club = require('./controllers/club.js');
const add = require('./controllers/add.js');
const remove = require('./controllers/remove.js');
const wrongCredentials = require('./controllers/wrongCredentials.js');

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
  .use(favicon(path.join(__dirname, 'static', 'images', 'favicon.png')))
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
  .get('/wrongCredentials', wrongCredentials) // Show you need to be logged in
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
