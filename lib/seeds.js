var debug = require('debug')('rose');
var seeds = require('./seedData');
var Feature = require('./feature');

module.exports = function () {
  debug('Seeding the database...');
  // Drop the features collection.
  return Feature.remove()
                .exec()
                .then(function () {
                  // Seed the features collection.
                  return Feature.create(seeds, function () {
                    debug('Seeding complete.');
                  });
                });
};
