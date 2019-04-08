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


var body = document.querySelector('body');
body.classList.remove('no-js');

var button1 = document.querySelector('.button1');
var button2 = document.querySelector('.button2');

var form1 = document.querySelector('.form1');
var form2 = document.querySelector('.form2');
var form3 = document.querySelector('.form3');

// Show form 2
function showform2(){
  event.preventDefault();
  form1.classList.toggle('hide');
  form2.classList.toggle('show');
}

button1.addEventListener('click', showform2, false);

// Show form 3
function showform3(){
  event.preventDefault();
  form2.classList.toggle('hide');
  form3.classList.toggle('show');
}

button2.addEventListener('click', showform3, false);