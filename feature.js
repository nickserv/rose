var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var featureSchema = new mongoose.Schema({
  name: String,
  examples: Object
});

featureSchema.statics.toArray = function (item) {
  return (item instanceof Array) ? item : [item];
};

featureSchema.statics.search = function (query, callback) {
  var thisFeature = this;

  thisFeature.find({}, function (err, docs) {
    if(query) {
      docs = docs.filter(function (feature) {
        return Object.keys(feature.examples).some(function (technology) {
          var snippets = thisFeature.toArray(feature.examples[technology]);

          return someContain(snippets, query);
        });
      });
    }

    callback(docs);
  });
};

var Feature = mongoose.model('Feature', featureSchema);

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

module.exports = Feature;
