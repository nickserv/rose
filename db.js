var seeds = require('./features.json');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var Feature = mongoose.model('Feature', {
  name: String,
  examples: Object
});

function handle(err) {
  if (err) {
    throw err;
  }
}

// Drop the collection (in case it was already seeded)
Feature.remove(function (err) {
  handle(err);

  // Seed the collection
  Feature.create(seeds, function (err) {
    handle(err);

    // Set up a public interface for accessing features with a callback
    module.exports.getFeatures = function (callback) {
      Feature.find({}, function (err, docs) {
        handle(err);

        callback(docs);
      });
    };
  });
});
