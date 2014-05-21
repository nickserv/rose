var Promise = require('mpromise');
var cheerio = require('cheerio');
var request = require('request');

module.exports = function () {
  var promise = new Promise;

  request('http://hyperpolyglot.org/version-control', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var features = [];

      var $ = cheerio.load(body);
      var technologies = [];

      $('.wiki-content-table').first().find('tr').each(function (index) {
        if (index === 1) {
          $(this).find('th').each(function (index) {
            if (index > 0) {
              var technology = $(this).text().replace(/\s*\(\d{4}\)/, '');
              technologies.push(technology);
            }
          });
        } else if (index > 1) {
          var feature = { examples: [] };
          $(this).find('td').each(function (index) {
            if (index === 0) {
              feature.name = $(this).text();
            } else if ($(this).text()) {
              feature.examples.push({
                technology: technologies[index - 1],
                snippets: $(this).text()
              });
            }
          });
          features.push(feature);
        }
      });

      promise.fulfill(features);
    }
  });

  return promise;
};
