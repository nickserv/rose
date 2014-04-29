var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var helpers = require('./helpers');

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

          return helpers.someContain(snippets, query);
        });
      });
    }

    callback(docs);
  });
};

module.exports = mongoose.model('Feature', featureSchema);
