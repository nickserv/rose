var seeds = require('./features.json');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var Feature = mongoose.model('Feature', {
  name: String,
  examples: Object
});

// Drop the collection (in case it was already seeded)
mongoose.connection.collections.features.drop(function (err) {
  if (err) { throw err; }

  // Seed the collection
  Feature.create(seeds, function (err) {
    if (err) { throw err; }

    // Set up a public interface for accessing features with a callback
    module.exports.getFeatures = function (callback) {
      Feature.find({}, function (err, docs) {
        if (err) { throw err; }

        callback(docs);
      });
    };
  });
});
