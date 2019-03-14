//Init app
const port = 3000;
const express = require('express');
const app = express();

var slug = require('slug');
var bodyParser = require('body-parser');

var find = require('array-find');
var club;

//data
var data = [];

//Routes
app
  .set('view engine', 'pug') //middleware at the top so it knows which template will be used
  .use(bodyParser.urlencoded({extended: true}))
  .use('/static', express.static('static'))
  .get('/', index)
  .get('/profile', profile)
  .get('/matches', matches)
  .get('/inbox', inbox)
  .get('/zoeken', zoeken)
  .get('/add', form)
  .get('/:id', club)
  .get('/', clubinformation)
  .post('/', add)

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
function zoeken (req, res) {
	res.render('zoeken.pug');
}

function club(req, res) {
  var id = req.params.id
  var doc = '<!doctype html>'
  var club = find(data, function (value) {
    return value.id === id
  })

  doc += '<title>' + club.club + ' - My club</title>'
  doc += '<h1>' + club.club + '</h1>'
  doc += '<p>' + club.time + '<p>'
  doc += '<p>' + club.description + '</p>'

  res.send(doc)
}

function clubinformation(req, res) {
  res.render('list.pug', {data: data})
}

//form
function form(req, res) {
  res.render('add.pug');
}

function add(req, res) {
  var id = slug(req.body.club).toLowerCase()

  data.push({
    id: id,
    club: req.body.club,
    time: req.body.time,
    description: req.body.description
  })

  res.redirect('/' + id)
}

//404 error
app.use(function notfound(req, res){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('notfound.pug');
    return;
  }

});

//Confirm message
app.listen(port, message())

function message(){
  console.log('Datingwebsite listening on port ' + port + ' !')
}



