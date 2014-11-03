var Promise = require('mpromise');
var cheerio = require('cheerio');
var request = require('request');

module.exports = function () {
  var promise = new Promise;

  request('http://hyperpolyglot.org/version-control', function (error, response, body) {
    if (!error) {
      var features = [];
      var $ = cheerio.load(body);
      var technologies = [];

      // Find the first table.
      $('.wiki-content-table').first().find('tr').each(function (index) {
        if (index === 1) {
          $(this).find('th').each(function (index) {
            if (index > 0) {
              // Get the names of the technologies, removing the years.
              var technology = $(this).text().replace(/\s*\(\d{4}\)/, '');
              technologies.push(technology);
            }
          });
        } else if (index > 1) {
          // Create a feature.
          var feature = { examples: [] };
          $(this).find('td').each(function (index) {
            // Get feature data.
            if (index === 0) {
              // Get the name of the feature.
              feature.name = $(this).text();
            } else if ($(this).text()) {
              // Collect the cell data as one example.
              feature.examples.push({
                technology: technologies[index - 1],
                snippets: $(this).text()
              });
            }
          });
          features.push(feature);
        }
      });

      // Fulfill the promise.
      promise.fulfill(features);
    }
  });

  return promise;
};
