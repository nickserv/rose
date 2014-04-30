var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rose');

var featureSchema = new mongoose.Schema({
  name: String,
  examples: [{
    technology: String,
    snippets: [String]
  }]
});

featureSchema.statics.search = function (query, callback) {
   this.find({ examples: { $elemMatch: { snippets: new RegExp(query, 'i') }}})
       .lean()
       .select('-__v -_id -examples._id')
       .exec(function (err, docs) {
         callback(docs);
       });
};

module.exports = mongoose.model('Feature', featureSchema);
