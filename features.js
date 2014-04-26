var features = require("./features.json");

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

function find (query) {
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

module.exports = { toArray: toArray, find: find };
