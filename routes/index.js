var express = require('express');
var router = express.Router();

var db = require('../db');
var features = require('../features');

/* GET home page. */
router.get('/', function(req, res) {
  db.getFeatures(function (featureData) {
    res.render('index', {
      title: 'Rose',
      features: features.find(featureData, req.query.query),
      query: req.query.query,
      toArray: features.toArray
    });
  });
});

module.exports = router;
