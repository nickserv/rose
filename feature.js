var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var Feature = mongoose.model('Feature', {
  name: String,
  examples: Object
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

function search(query, callback) {
  Feature.find({}, function (err, docs) {
    if(query) {
      docs = docs.filter(function (feature) {
        return Object.keys(feature.examples).some(function (technology) {
          var snippets = toArray(feature.examples[technology]);

          return someContain(snippets, query);
        });
      });
    }

    callback(docs);
  });
}

module.exports = { toArray: toArray, search: search };
