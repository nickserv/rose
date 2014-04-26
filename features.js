var features = require("./features.json");

exports.toArray = function (item) {
  return (item instanceof Array) ? item : [item];
};

exports.find = function (query) {
  if(query) {
    return features.filter(function (feature) {
      //return example.code.indexOf(query) > -1;
      return Object.keys(feature.examples).some(function (key) {
        return feature.examples[key].indexOf(query) > -1;
      });
    });
    //return new Array(_.findWhere(exports.getLibraries(), { name: names }));
  } else {
    return features;
  }
};
