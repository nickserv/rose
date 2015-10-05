var debug = require('debug')('rose');
var Feature = require('./feature');

module.exports = function (dataPromise) {
  debug('Seeding the database...');
  // Drop and seed the features collection.
  return Promise
      .all([
        dataPromise,
        Feature.remove().exec()
      ])
      .then(function (values) {
        return Feature.create(values[0], function () {
          debug('Seeding complete.');
        })
      });
};
