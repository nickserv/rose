require('./test_helper');

describe('engine', () => {
  describe('.search()', () => {
    const gitAddFeature = [{
      name: 'add files',
      examples: [
        { technology: 'Git', snippet: 'git add' },
        { technology: 'Mercurial', snippet: 'hg add' },
        { technology: 'Subversion', snippet: 'svn add' }
      ]
    }];

    context('with an empty query', () => {
      it('finds all features', () => {
        return expect(engine.search(features, '')).to.have.length(7);
      });
    });

    context('with a feature query', () => {
      it('finds all matching features', () => {
        return expect(engine.search(features, 'add files')).to.eql(gitAddFeature);
      });
    });

    context('with a technology query', () => {
      it('finds all matching features', () => {
        return expect(engine.search(features, 'git')).to.have.length(6);
      });
    });

    context('with a command query', () => {
      it('finds all matching features', () => {
        return expect(engine.search(features, 'git ADD')).to.eql(gitAddFeature);
      });
    });

    context('with a command query for a command that does not exist', () => {
      it('finds no features', () => {
        return expect(engine.search(features, 'git yolo')).to.have.length(0);
      });
    });
  });
});
