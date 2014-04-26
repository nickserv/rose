var features = require("./features.json");

// ignoreCase default to true
function contains(string, query, ignoreCase) {
  if (ignoreCase !== false) {
    string = string.toLowerCase();
    query = query.toLowerCase();
  }
  return string.indexOf(query) !== -1;
}

function toArray (item) {
  return (item instanceof Array) ? item : [item];
}

function find (query) {
  if(!query) {
    return features;
  }

  return features.filter(function (feature) {
    //return example.code.indexOf(query) > -1;
    return Object.keys(feature.examples).some(function (technology) {
      var snippets = toArray(feature.examples[technology]);

      return snippets.some(function (snippet) {
        return contains(snippet, query);
      });
    });
  });
  //return new Array(_.findWhere(exports.getLibraries(), { name: names }));
}

module.exports = { toArray: toArray, find: find };
