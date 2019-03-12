const camelCase = require('camelcase');
 
console.log(camelCase('foo-bar'));
//=> 'fooBar'

const express = require('express')

//Init app
const app = express();
const port = 3000;


app.set('view engine', 'pug'); //middleware bovenaan zetten zodat hij weet welke template engine er wordt gebruikt
app.use('/static', express.static('static'));
app.get('/', index)
app.get('/profiel', profiel)
app.get('/matches', matches)
app.get('/inbox', inbox)
app.get('/zoeken', zoeken)


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

//404 error
app.use(function notfound(req, res){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('notfound.pug');
    return;
  }

});

app.listen(port, () => console.log(`Datingwebsite listening on port ${port}!`))



