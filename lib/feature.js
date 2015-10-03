const debug = require('debug')('rose');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/rose';
debug(`Connecting to MongoDB at ${ mongoURI }...`);
mongoose.connect(mongoURI);

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  examples: {
    type: [{
      technology: { type: String, required: true },
      snippets: { type: [String], required: true }
    }],
    required: true
  }
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
