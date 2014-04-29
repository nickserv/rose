var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var helpers = require('./helpers');

var featureSchema = new mongoose.Schema({
  name: String,
  examples: Object
});

featureSchema.statics.search = function (query, callback) {
  this.find({}, function (err, docs) {
    if(query) {
      docs = docs.filter(function (feature) {
        return Object.keys(feature.examples).some(function (technology) {
          var snippets = helpers.toArray(feature.examples[technology]);

          return helpers.someContain(snippets, query);
        });
      });
    }

    callback(docs);
  });
};

module.exports = mongoose.model('Feature', featureSchema);
