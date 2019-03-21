const express = require('express');
const router = express.Router();
var slug = require('slug');

router.post('/', add)

//data
var data = [];

function add(req, res) {
    var id = slug(req.body.club).toLowerCase()
  
    data.push({
      id: id,
      title: req.body.title,
      club: req.body.club,
      time: req.body.time,
      description: req.body.description
    })
  
    res.redirect('/myclub');
  }

  function club(req, res, next) {
    var id = req.params.id;
    var club = find(data, function (value) {
      return value.id === id;
    })
  
    res.render('myclub.pug', {data: data});

    if (!club) {
      next();
      return;
    }
  
    res.render('myclub.pug', {data: data});
  }

module.exports = router;