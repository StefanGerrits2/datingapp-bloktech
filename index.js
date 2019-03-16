//Init app
const port = 3000;
const express = require('express');
const app = express();

var slug = require('slug');
var bodyParser = require('body-parser');

var find = require('array-find');


//data
var data = [
  {
    club: 'Heemskerk',
    time: '9 Jaar',
    description: 'Hoi'
  }
];

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
  .get('/add', form)//Add a club form
  .get('/:id', club)//Renders data at new page
  .get('/list', clubinformation)
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
function form(req, res) {
  res.render('add.pug');
}

function club(req, res) {
  var id = req.params.id;
  var club = find(data, function (value) {
    return value.id === id;
  })
  
  res.render("list.pug", {post: club});
}

function clubinformation(req, res) {
  res.render('list.pug', {data: data})
}

//form
function add(req, res) {
  var id = slug(req.body.club).toLowerCase()

  data.push({
    id: id,
    title: req.body.title,
    club: req.body.club,
    time: req.body.time,
    description: req.body.description
  })

  res.redirect('/list');
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

console.log(data);
