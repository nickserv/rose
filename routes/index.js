var express = require('express');
var router = express.Router();

var Feature = require('../feature');

/* GET home page. */
router.get('/', function(req, res) {
  Feature.search(req.query.query, function (docs) {
    res.render('index', {
      title: 'Rose',
      features: docs,
      query: req.query.query
    });
  });
});

/* GET JSON API. */
router.get('/index.json', function(req, res) {
  Feature.search(req.query.query, function (docs) {
    res.json(docs);
  });
});

module.exports = router;
