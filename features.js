var features = require("./features.json");

function contains(string, query) {
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
        return contains(feature.examples[key], query);
      });
    });
    //return new Array(_.findWhere(exports.getLibraries(), { name: names }));
  } else {
    return features;
  }
};
