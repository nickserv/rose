var expect = require('expect.js');
var seeds = require('../seeds');
var Feature = require('../feature');

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
        expect(err).to.not.be.ok();
        done();
      });
    });

    it('does not create an invalid Feature', function (done) {
      Feature.create({
        name: 'no examples here'
      }, function (err) {
        expect(err).to.be.ok();
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

    before(function (done) {
      seeds().then(function () {
        done();
      });
    });

    context('with an empty query', function () {
      it('finds all features', function (done) {
        Feature.search('').then(function (docs) {
          expect(docs.length).to.be(7);
          done();
        });
      });
    });

    context('with a feature query', function () {
      it('finds all matching features', function (done) {
        Feature.search('add files').then(function (docs) {
          expect(docs).to.eql(gitAddFeature);
          done();
        });
      });
    });

    context('with a technology query', function () {
      it('finds all matching features', function (done) {
        Feature.search('git').then(function (docs) {
          expect(docs.length).to.be(6);
          done();
        });
      });
    });

    context('with a command query', function () {
      it('finds all matching features', function (done) {
        Feature.search('git ADD').then(function (docs) {
          expect(docs).to.eql(gitAddFeature);
          done();
        });
      });
    });

    context('with a command query for a command that does not exist', function () {
      it('finds no features', function (done) {
        Feature.search('git yolo').then(function (docs) {
          expect(docs.length).to.be(0);
          done();
        });
      });
    });
  });
});
