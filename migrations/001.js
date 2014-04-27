var seeds = require('../features.json');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var Feature = mongoose.model('Feature', {
  name: String,
  examples: Object
});

exports.up = function(next){
  // Seed the features collection.
  Feature.create(seeds, function () {
    next();
  });
};

exports.down = function(next){
  // Drop the features collection.
  Feature.remove(function () {
    next();
  });
};
