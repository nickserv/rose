var Promise = require('es6-promise').Promise;
var cheerio = require('cheerio');
var request = require('request');

// Scrape all technology names from a table header row.
function scrapeTechnologies($tr, $) {
  var technologies = [];
  $tr.find('th').each(function (index) {
    if (index > 0) {
      // Get the name of the technology, removing the year.
      var technology = $(this).text().replace(/\s*\(\d{4}\)/, '');
      technologies.push(technology);
    }
  });
  return technologies;
}

// Scrape a feature from a table row.
function scrapeFeature($tr, $, technologies) {
  var feature = { examples: [] };
  $tr.find('td').each(function (index) {
    var text = $(this).text();

    // Get feature data.
    if (index === 0) {
      // Get the name of the feature.
      feature.name = text;
    } else if (text) {
      // Collect the cell data as one example.
      feature.examples.push({
        technology: technologies[index - 1],
        snippets: text
      });
    }
  });
  return feature;
}

// Scrape all features from a table.
function scrapeTable($table, $) {
  var features = [];
  var technologies = [];

  $table.find('tr').each(function (index) {
    if (index === 1) {
      technologies = scrapeTechnologies($(this), $);
    } else if (index > 1) {
      features.push(scrapeFeature($(this), $, technologies));
    }
  });

  return features;
}

// Scrape features from the Hyperpolyglot website.
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
