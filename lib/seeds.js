const debug = require('debug')('rose');
const seeds = require('./seedData');
const Feature = require('./feature');

module.exports = () => {
  debug('Seeding the database...');
  // Drop the features collection.
  return Feature.remove()
                .exec()
                .then(function () {
                  // Seed the features collection.
                  return Feature.create(seeds, () => {
                    debug('Seeding complete.');
                  });
                });
};
