const debug = require('debug')('rose');
const features = require('./features');

module.exports = data => {
  debug('Seeding the database...');
  // Drop and seed the features collection.
  return features.remove()
    .then(() => features.create(data))
    .then(() => debug('Seeding complete.'));
};
