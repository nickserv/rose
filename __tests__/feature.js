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

    it('does not create an invalid Feature', done => {
      Feature.create({
        name: 'no examples here'
      })
        .then(() => done(true))
        .catch(() => done());
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
        return Feature.search('')
          .then(features => expect(features).toHaveLength(7));
      });
    });

    describe('with a feature query', () => {
      it('finds all matching features', () => {
        return Feature.search('add files')
          .then(features => expect(features).toEqual(gitAddFeature));
      });
    });

    describe('with a technology query', () => {
      it('finds all matching features', () => {
        return Feature.search('git')
          .then(features => expect(features).toHaveLength(6));
      });
    });

    describe('with a command query', () => {
      it('finds all matching features', () => {
        return Feature.search('git ADD')
          .then(features => expect(features).toEqual(gitAddFeature));
      });
    });

    describe('with a command query for a command that does not exist', () => {
      it('finds no features', () => {
        return Feature.search('git yolo')
          .then(features => expect(features).toHaveLength(0));
      });
    });
  });
});
