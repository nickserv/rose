var Promise = require('es6-promise').Promise;
var cheerio = require('cheerio');
var request = require('request');

// Scrape an entire table of technologies and features.
function scrapeTable($table, $) {
  var features = [];
  var technologies = [];

  $table.find('tr').each(function (index) {
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

  return features;
}

module.exports = function () {
  return new Promise(function (resolve) {
    request('http://hyperpolyglot.org/version-control', function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body);

        // Find the first table.
        var features = scrapeTable($('.wiki-content-table').first(), $);

        // Fulfill the promise.
        resolve(features);
      }
    });
  })
};
