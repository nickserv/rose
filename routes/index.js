var express = require('express');
var router = express.Router();

var features = require("../features.json");

function findFeatures(query) {
  if(query) {
    return features.filter(function (feature) {
      //return example.code.indexOf(query) > -1;
      return Object.keys(feature.examples).some(function (key) {
        return feature.examples[key].indexOf(query) > -1;
      });
    });
    //return new Array(_.findWhere(exports.getLibraries(), { name: names }));
  } else {
    return features;
  }
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Rose',
    features: findFeatures(req.query.query),
    query: req.query.query
  });
});

module.exports = router;
