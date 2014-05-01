var expect = require('expect.js');
var seeds = require('../seeds');
var Feature = require('../feature');

describe('Feature', function () {
  before(seeds);

  describe('schema', function () {
    it('successfully creates a valid document');
    it('fails at creating an invalid document');
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

    it('performs an empty search, returning all commands', function (done) {
      Feature.search('').then(function (docs) {
        expect(docs.length).to.be(7);
        done();
      });
    });

    it('performs a case-insensitive search for a feature', function (done) {
      Feature.search('add files').then(function (docs) {
        expect(docs).to.eql(gitAddFeature);
        done();
      });
    });

    it('performs a case-insensitive search for a technology', function (done) {
      Feature.search('git').then(function (docs) {
        expect(docs.length).to.be(6);
        done();
      });
    });

    it('performs a case-insensitive search for a command', function (done) {
      Feature.search('git ADD').then(function (docs) {
        expect(docs).to.eql(gitAddFeature);
        done();
      });
    });

    it('discards extra hidden fields created by MongoDB');

    it('performs a search for a command that does not exist', function (done) {
      Feature.search('git yolo').then(function (docs) {
        expect(docs.length).to.be(0);
        done();
      });
    });
  });
});
