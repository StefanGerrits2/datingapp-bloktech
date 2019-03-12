var slug = require('slug')
var bodyParser = require('body-parser')

const express = require('express')
var find = require('array-find')

var club;

//data
var data = [];

//Init app
const app = express();
const port = 3000;

app.set('view engine', 'pug'); //middleware bovenaan zetten zodat hij weet welke template engine er wordt gebruikt
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static('static'));
app.get('/', index);
app.get('/profiel', profiel);
app.get('/matches', matches);
app.get('/inbox', inbox);
app.get('/zoeken', zoeken);
app.get('/add', form);
app.get('/:id', club);
app.get('/', clubinformation);
app.post('/', add);

function index (req, res) {
	res.render('index.pug');
}
function profiel (req, res) {
	res.render('profiel.pug');
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

function clubinformation(req, res) {
  var doc = '<!doctype html>'
  var length = data.length
  var index = -1

  doc += '<title>My club</title>'
  doc += '<h1>Club</h1>'

  while (++index < length) {
    club = data[index]
    doc += '<h2><a href="/' + club.id + '">' + club.club + '</a></h2>'
    doc += '<p>' + club.time + '</p>'
  }

  res.send(doc)
}

function club(req, res) {
  var id = req.params.id
  var doc = '<!doctype html>'
  var club = find(data, function (value) {
    return value.id === id
  })

  doc += '<title>' + club.club + ' - My club</title>'
  doc += '<h1>' + club.time + '</h1>'
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
app.listen(port, () => console.log(`Datingwebsite listening on port ${port}!`))



