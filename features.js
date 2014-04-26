var features = require("./features.json");

// ignoreCase default to true
function contains(string, query, ignoreCase) {
  if (ignoreCase !== false) {
    string = string.toLowerCase();
    query = query.toLowerCase();
  }
  return string.indexOf(query) !== -1;
}

exports.toArray = function (item) {
  return (item instanceof Array) ? item : [item];
};

exports.find = function (query) {
  if(query) {
    return features.filter(function (feature) {
      //return example.code.indexOf(query) > -1;
      return Object.keys(feature.examples).some(function (key) {
        var snippets = feature.examples[key];

        if (typeof snippets === 'string') {
          return contains(snippets, query);
        } else {
          return snippets.some(function (snippet) {
            return contains(snippet, query);
          });
        }
      });
    });
    //return new Array(_.findWhere(exports.getLibraries(), { name: names }));
  } else {
    return features;
  }
};
