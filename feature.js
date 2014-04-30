var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var helpers = require('./helpers');

var featureSchema = new mongoose.Schema({
  name: String,
  examples: [{
    technology: String,
    snippets: [String]
  }]
});

featureSchema.statics.search = function (query, callback) {
  var findResults;
  if (query) {
     findResults = this.find({ examples: { $elemMatch: { snippets: new RegExp(query, 'i') }}});
  } else {
     findResults = this.find({});
  }

  findResults.lean().select('-examples._id').exec(function (err, docs) {
    callback(docs);
  });
};

module.exports = mongoose.model('Feature', featureSchema);
