var debug = require('debug')('rose');
var mongoose = require('mongoose');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/mydb';
debug('Connecting to MongoDB at ' + mongoURI + '...');
mongoose.connect(mongoURI);

var featureSchema = new mongoose.Schema({
  name: String,
  examples: [{
    technology: String,
    snippets: [String]
  }]
});

featureSchema.statics.search = function (query) {
  return this.find({ $or: [
                     { name: new RegExp(query, 'i') },
                     { examples: { $elemMatch: {
                       $or: [
                         { technology: new RegExp(query, 'i') },
                         { snippets: new RegExp(query, 'i') }
                       ]
                     }}},
                  ]})
             .lean()
             .select('-__v -_id -examples._id')
             .exec();
};

module.exports = mongoose.model('Feature', featureSchema);
