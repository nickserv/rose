require('./test_helper');

describe('Feature', function () {
  describe('schema', function () {
    it('creates a valid Feature', function (done) {
      Feature.create({
        name: 'map over elements',
        examples: [
          { technology: 'Common Lisp', snippets: 'map' },
          { technology: 'Haskell', snippets: 'map' },
          { technology: 'JavaScript', snippets: 'Array#map' },
          { technology: 'Python', snippets: 'map' },
          { technology: 'Ruby', snippets: ['Enumerable#map', 'Enumerable#collect'] }
        ]
      }, function (err) {
        expect(err).to.not.exist;
        done();
      });
    });

    it('does not create an invalid Feature', function (done) {
      Feature.create({
        name: 'no examples here'
      }, function (err) {
        expect(err).to.exist;
        done();
      });
    });
  });

  describe('.search()', function () {
    var gitAddFeature = [{
      name: 'add files',
      examples: [
        { technology: 'Git', snippets: ['git add'] },
        { technology: 'Mercurial', snippets: ['hg add'] },
        { technology: 'Subversion', snippets: ['svn add'] }
      ]
    }];

    before(mockedSeeds);

    context('with an empty query', function () {
      it('finds all features', function () {
        return expect(Feature.search('')).to.eventually.have.length(7);
      });
    });

    context('with a feature query', function () {
      it('finds all matching features', function () {
        return Feature.search('add files').then(function (features) {
          removeIds(features);
          expect(features).to.have.length(1);
          expect(features).to.eql(gitAddFeature);
        })
      });
    });

    context('with a technology query', function () {
      it('finds all matching features', function () {
        return expect(Feature.search('git')).to.eventually.have.length(6);
      });
    });

    context('with a command query', function () {
      it('finds all matching features', function () {
        return Feature.search('git ADD').then(function (features) {
          removeIds(features);
          expect(features).to.have.length(1);
          expect(features).to.eql(gitAddFeature);
        });
      });
    });

    context('with a command query for a command that does not exist', function () {
      it('finds no features', function () {
        return expect(Feature.search('git yolo')).to.eventually.have.length(0);
      });
    });
  });
});
