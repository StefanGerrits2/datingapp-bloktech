console.log('Hello world!');

/* Source used: https://github.com/cmda-bt/be-course-18-19/blob/master/examples/mongodb-server/static/index.js */
var remove = document.getElementById('js-remove');

if (remove) {
  remove.addEventListener('click', onremove);
}

function onremove(ev) {
  var node = ev.target;
  var id = node.dataset.id;

  fetch('/' + id, {method: 'delete'})
    .then(onresponse)
    .then(onload, onfail);

  function onresponse(res) {
    return res.json();
  }

  function onload() {
    window.location = '/myclub';
  }

  function onfail() {
    throw Error('Could not delete!');
  }
}

