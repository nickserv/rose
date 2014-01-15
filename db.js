var client = require('mongodb').MongoClient;
var seeds = require('./features.json');

client.connect('mongodb://localhost:27017/rose', function (err, db) {
  if (err) { throw err; }

  var collection = db.collection('features');

  // Drop the collection (in case it was already seeded)
  collection.drop();
  
  // Seed the collection
  collection.insert(seeds, function (err, docs) {
    if (err) { throw err; }

    // Set up a public interface for accessing features with a callback
    module.exports.getFeatures = function (callback) {
      collection.find().toArray(function (err, docs) {
        if (err) { throw err; }

        callback(docs);
      });
    };
  });
});
