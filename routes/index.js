var express = require('express');
var router = express.Router();

var features = require('../features');

/* GET home page. */
router.get('/', function(req, res) {
  features.seed.then(function (featureData) {
    res.render('index', {
      title: 'Rose',
      features: features.find(featureData, req.query.query),
      query: req.query.query,
      toArray: features.toArray
    });
  }, function (err) {
    throw err;
  });
});

module.exports = router;
