var seeds = require('./features.json');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var Feature = mongoose.model('Feature', {
  name: String,
  examples: Object
});

// seed drops the features collection, seeds it, and returns a promise with all
// features.
module.exports.seed = Feature.remove().exec()
  .then(function () {
    return Feature.create(seeds);
  })
  .then(function () {
    return Feature.find({}).exec();
  });
