var scraper = require('../scraper');
var Feature = require('../feature');
var SECOND = 1000;

describe('scraper', function () {
  it('generates JSON for valid Features', function (done) {
    this.timeout(10 * SECOND);
    scraper.scrape().then(function (seeds) {
      seeds.forEach(function (seed, index, array) {
        (new Feature(seed)).validate(function (err) {
          if (err) {
            done(err);
          } else if (index === array.length - 1) {
            done();
          }
        });
      });
    });
  });
});
