console.log('Hello world!');

/* Source used: https://github.com/cmda-bt/be-course-18-19/blob/master/examples/mongodb-server/static/index.js */
var remove = document.getElementById('remove');

if (remove) {
  remove.addEventListener('click', onremove);
}

function onremove(e) {
  var node = e.target;
  var id = node.dataset.id;
  var res = new XMLHttpRequest();

  res.open('DELETE', '/' + id);
  res.onload = onload;
  res.send();

  function onload() {
    if (res.status !== 200) {
      throw new Error('Could not delete!');
    }
    else {
      window.location = '/myclub';
    }
  } 
}

// Frontend Enhancement
var form1 = document.querySelector('.form1');
var form2 = document.querySelector('.form2');
var form3 = document.querySelector('.form3');


// Volgende
var body = document.querySelector('body');
body.classList.remove('no-js');

var volgende1 = document.querySelector('.volgende1');
var volgende2 = document.querySelector('.volgende2');

// Volgende
form1.classList.toggle('show');
form2.classList.toggle('hide');
form3.classList.toggle('hide');

// Show form 2
function showform2(){
  event.preventDefault();
  form1.classList.replace('show', 'hide');
  form2.classList.replace('hide', 'show');
}

volgende1.addEventListener('click', showform2, false);

// Show form 3
function showform3(){
  event.preventDefault();
  form2.classList.replace('show', 'hide');
  form3.classList.replace('hide', 'show');
}

volgende2.addEventListener('click', showform3, false);


// Vorige
var vorige1 = document.querySelector('.vorige1');
var vorige2 = document.querySelector('.vorige2');

// Show form 1
function previousform1(){
  event.preventDefault();
  form2.classList.replace('show', 'hide');
  form1.classList.replace('hide', 'show');
}

vorige1.addEventListener('click', previousform1, false);

// Show form 2
function previousform2(){
  event.preventDefault();
  form3.classList.replace('show', 'hide');
  form2.classList.replace('hide', 'show');
}

vorige2.addEventListener('click', previousform2, false);