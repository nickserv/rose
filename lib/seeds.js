var debug = require('debug')('rose');
var Feature = require('./feature');
var scraper = require('./scraper');

module.exports = function () {
  debug('Seeding the database...');
  // Drop and seed the features collection.
  return Promise
      .all([
        scraper.scrape(),
        Feature.remove()
      ])
      .then(function (values) {
        return Feature.create(values[0], function () {
          debug('Seeding complete.');
        })
      });
};
