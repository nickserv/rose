var seeds = require('./features.json');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var Feature = mongoose.model('Feature', {
  name: String,
  examples: Object
});

// seed drops the features collection, seeds it, and returns a promise with all
// features.
var seed = Feature.remove().exec()
  .then(function () {
    return Feature.create(seeds);
  })
  .then(function () {
    return Feature.find({}).exec();
  });

// ignoreCase default to true
function contains(string, query, ignoreCase) {
  if (ignoreCase !== false) {
    string = string.toLowerCase();
    query = query.toLowerCase();
  }
  return string.indexOf(query) !== -1;
}

// ignoreCase default to true
function someContain(strings, query, ignoreCase) {
  return strings.some(function (string) {
    return contains(string, query, ignoreCase);
  });
}

function toArray (item) {
  return (item instanceof Array) ? item : [item];
}

function find(features, query) {
  if(!query) {
    return features;
  }

  return features.filter(function (feature) {
    return Object.keys(feature.examples).some(function (technology) {
      var snippets = toArray(feature.examples[technology]);

      return someContain(snippets, query);
    });
  });
}

module.exports = { seed: seed, toArray: toArray, find: find };
