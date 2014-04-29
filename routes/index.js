var express = require('express');
var router = express.Router();

var feature = require('../feature');

/* GET home page. */
router.get('/', function(req, res) {
  feature.search(req.query.query, function (docs) {
    res.render('index', {
      title: 'Rose',
      features: docs,
      query: req.query.query,
      toArray: feature.toArray
    });
  });
});

module.exports = router;
