require('./test_helper');

describe('Feature', () => {
  describe('schema', () => {
    it('creates a valid Feature', done => {
      Feature.create({
        name: 'map over elements',
        examples: [
          { technology: 'Common Lisp', snippets: 'map' },
          { technology: 'Haskell', snippets: 'map' },
          { technology: 'JavaScript', snippets: 'Array#map' },
          { technology: 'Python', snippets: 'map' },
          { technology: 'Ruby', snippets: ['Enumerable#map', 'Enumerable#collect'] }
        ]
      }, err => {
        expect(err).to.not.exist;
        done();
      });
    });

    it('does not create an invalid Feature', done => {
      Feature.create({
        name: 'no examples here'
      }, err => {
        expect(err).to.exist;
        done();
      });
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

    before(mockedSeeds);

    context('with an empty query', () => {
      it('finds all features', () => {
        return expect(Feature.search('')).to.eventually.have.length(7);
      });
    });

    context('with a feature query', () => {
      it('finds all matching features', () => {
        return expect(Feature.search('add files')).to.eventually.eql(gitAddFeature);
      });
    });

    context('with a technology query', () => {
      it('finds all matching features', () => {
        return expect(Feature.search('git')).to.eventually.have.length(6);
      });
    });

    context('with a command query', () => {
      it('finds all matching features', () => {
        return expect(Feature.search('git ADD')).to.eventually.eql(gitAddFeature);
      });
    });

    context('with a command query for a command that does not exist', () => {
      it('finds no features', () => {
        return expect(Feature.search('git yolo')).to.eventually.have.length(0);
      });
    });
  });
});
