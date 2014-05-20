var scraper = require('../scraper');
var Feature = require('../feature');

describe('scraper', function () {
  it('generates JSON for valid Features', function (done) {
    scraper(function (seeds) {
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
