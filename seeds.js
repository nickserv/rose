var seeds = require('./features.json');
var Feature = require('./feature');

module.exports = function (callback) {
  console.log('Seeding the database...')
  // Drop the features collection.
  Feature.remove(function () {
    // Seed the features collection.
    Feature.create(seeds, function () {
      console.log('Seeding complete.')
      callback();
    });
  });
};
