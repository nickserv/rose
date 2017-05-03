describe('Feature', () => {
  describe('schema', () => {
    it('creates a valid Feature', () => {
      return Feature.create({
        name: 'map over elements',
        examples: [
          { technology: 'Common Lisp', snippets: 'map' },
          { technology: 'Haskell', snippets: 'map' },
          { technology: 'JavaScript', snippets: 'Array#map' },
          { technology: 'Python', snippets: 'map' },
          { technology: 'Ruby', snippets: ['Enumerable#map', 'Enumerable#collect'] }
        ]
      });
    });

    it('does not create an invalid Feature', () => {
      return expect(Feature.create({ name: 'no examples here' })).to.be.rejected
    });
  });

  describe('.search()', () => {
    const gitAddFeature = [{
      name: 'add files',
      examples: [
        { technology: 'Git', snippets: ['git add'] },
        { technology: 'Mercurial', snippets: ['hg add'] },
        { technology: 'Subversion', snippets: ['svn add'] }
      ]
    }];

    beforeAll(mockedSeeds);

    describe('with an empty query', () => {
      it('finds all features', () => {
        return expect(Feature.search('')).to.eventually.have.length(7);
      });
    });

    describe('with a feature query', () => {
      it('finds all matching features', () => {
        return expect(Feature.search('add files')).to.eventually.eql(gitAddFeature);
      });
    });

    describe('with a technology query', () => {
      it('finds all matching features', () => {
        return expect(Feature.search('git')).to.eventually.have.length(6);
      });
    });

    describe('with a command query', () => {
      it('finds all matching features', () => {
        return expect(Feature.search('git ADD')).to.eventually.eql(gitAddFeature);
      });
    });

    describe('with a command query for a command that does not exist', () => {
      it('finds no features', () => {
        return expect(Feature.search('git yolo')).to.eventually.have.length(0);
      });
    });
  });
});
