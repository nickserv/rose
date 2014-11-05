require('es6-promise').polyfill();
var cheerio = require('cheerio');
var request = require('request');
var url     = require('url');

module.exports = {
  // Scrape all technology names from a table header row.
  scrapeTechnologies: function ($tr, $) {
    var technologies = [];
    $tr.find('th').each(function (index) {
      if (index > 0) {
        // Get the name of the technology, removing the year.
        var technology = $(this).text().replace(/\s*\(\d{4}\)/, '');
        technologies.push(technology);
      }
    });
    return technologies;
  },

  // Scrape a feature from a table row.
  scrapeFeature: function ($tr, $, technologies) {
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
  },

  // Scrape all features from a table.
  scrapeTable: function ($table, $) {
    var features = [];
    var technologies = [];

    $table.find('tr').each(function (index) {
      if ($(this).find('th').length) {
        technologies = module.exports.scrapeTechnologies($(this), $);
      } else if ($(this).find('td').first().text()) {
        features.push(module.exports.scrapeFeature($(this), $, technologies));
      }
    });

    return features;
  },

  // Gets a list of all Rosetta Stone pages from http://hyperpolyglot.org/.
  getPages: function () {
    return module.exports.requestPromise('http://hyperpolyglot.org/').then(function (body) {
      var links = [];
      var $ = cheerio.load(body);
      $('a').each(function () {
        var currentHREF = $(this).attr('href');
        var currentURL = url.parse(currentHREF);
        if (!currentURL.host && currentURL.path !== '/') {
          links.push(url.resolve('http://hyperpolyglot.org/', currentHREF));
        }
      });
      return links;
    });
  },

  // A wrapper for request() that returns a Promise instead of using callbacks.
  requestPromise: function (link) {
    return new Promise(function (resolve, reject) {
      request(link, function (error, response, body) {
        if (error || response.statusCode != 200) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  },

  // Scrape features from the Hyperpolyglot website.
  scrape: function () {
    return module.exports.requestPromise('http://hyperpolyglot.org/version-control').then(function (body) {
      var $ = cheerio.load(body);

      // Find the first table.
      return module.exports.scrapeTable($('.wiki-content-table').first(), $);
    }).catch(function (e) {
      console.error(e);
    });
  }
};
