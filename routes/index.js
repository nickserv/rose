var express = require('express');
var router = express.Router();

var features = require('../features');

/* GET home page. */
router.get('/', function(req, res) {
  features.find(req.query.query, function (docs) {
    res.render('index', {
      title: 'Rose',
      features: docs,
      query: req.query.query,
      toArray: features.toArray
    });
  });
});

module.exports = router;
