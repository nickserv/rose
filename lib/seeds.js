const debug = require('debug')('rose');
const Feature = require('./feature');

module.exports = dataPromise => {
  debug('Seeding the database...');
  // Drop and seed the features collection.
  return Promise
      .all([
        dataPromise,
        Feature.remove().exec()
      ])
      .then(values => {
        return Feature.create(values[0], () => {
          debug('Seeding complete.');
        })
      });
};
