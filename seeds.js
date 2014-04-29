var debug = require('debug')('rose');
var seeds = require('./seedData');
var Feature = require('./feature');

module.exports = function (callback) {
  debug('Seeding the database...');
  // Drop the features collection.
  Feature.remove(function () {
    // Seed the features collection.
    Feature.create(seeds, function () {
      debug('Seeding complete.');
      callback();
    });
  });
};
