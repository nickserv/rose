var cheerio = require('cheerio');
var request = require('request');

function scrape(callback) {
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
          var feature = {};
          $(this).find('td').each(function (index) {
            if (index === 0) {
              feature.name = $(this).html();
            } else if ($(this).text()) {
              feature.examples = feature.examples || {};
              var technology = technologies[index - 1];
              feature.examples[technology] = $(this).text();
            }
          });
          features.push(feature);
        }
      });

      callback(features);
    }
  });
}

scrape(function (features) {
  console.log(features);
});
