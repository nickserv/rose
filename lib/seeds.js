const debug = require('debug')('rose');
const Feature = require('./feature');

module.exports = data => {
  debug('Seeding the database...');
  // Drop and seed the features collection.
  return Feature.remove()
    .then(() => Feature.create(data))
    .then(() => debug('Seeding complete.'));
};
