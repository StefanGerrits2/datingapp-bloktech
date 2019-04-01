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

