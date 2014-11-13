var express = require('express');
var router = express.Router();

var Feature = require('../models/feature');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* GET JSON API. */
router.get('/index.json', function(req, res) {
  Feature.search(req.query.query).then(function (docs) {
    res.json(docs);
  });
});

module.exports = router;
