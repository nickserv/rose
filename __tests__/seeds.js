const features = require('../lib/features');
const seedData = require('./seedData');
const seeds = require('../lib/seeds');

describe('seeds', () => {
  function compare(feature1, feature2) {
    if (feature1.name < feature2.name) return -1;
    else if (feature1.name > feature2.name) return 1;
    else return 0;
  }

  function sort(features) {
    return new Set(features.sort(compare));
  }

  beforeAll(() => {
    return features.remove()
      .then(() => features.create(seedData[0]));
  });

  it('clears and seeds the features collection', () => {
    return seeds(seedData)
      .then(() => features.find().select('-__v -_id -examples._id').lean())
      .then(features => expect(sort(features)).toEqual(sort(seedData)));
  });
});
