describe('seeds', () => {
  beforeAll(() => {
    return Feature.remove()
      .then(() => Feature.create(seedData[0]));
  });

  it('clears and seeds the features collection', () => {
    return seeds(seedData)
      .then(() => Feature.find().select('-__v -_id -examples._id').lean())
      .then(features => expect(features).to.have.deep.members(seedData));
  });
});
