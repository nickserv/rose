var seeds = require('./features.json');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var Feature = mongoose.model('Feature', {
  name: String,
  examples: Object
});

// Drop the collection (in case it was already seeded)
module.exports.getFeatures = Feature.remove().exec()
  .then(function () {
    // Seed the collection
    return Feature.create(seeds);
  })
  .then(function () {
    // Set up a public interface for accessing features with a callback
    return Feature.find({}).exec();
  });
