var scraper = require('../scraper');
var Feature = require('../feature');

describe('scraper', function () {
  it('generates JSON for valid Features', function (done) {
    scraper(function (seeds) {
      (new Feature(seeds)).validate(function (err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });
});
