var seeds = require('./features.json');
var Feature = require('./feature');

module.exports = function (callback) {
  // Drop the features collection.
  Feature.remove(function () {
    // Seed the features collection.
    Feature.create(seeds, function () {
      callback();
    });
  });
};
