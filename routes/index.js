var express = require('express');
var router = express.Router();

var features = require('../features');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Rose',
    features: features.find(req.query.query),
    query: req.query.query,
    toArray: features.toArray
  });
});

module.exports = router;
