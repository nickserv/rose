var expect = require('expect.js');
var seeds = require('../seeds');
var Feature = require('../feature');

describe('Feature', function () {
  before(function (done) {
    seeds(done);
  });

  describe('schema', function () {
    it('successfully creates a valid document');
    it('fails at creating an invalid document');
  });

  describe('.search()', function () {
    it('performs an empty search, returning all commands', function (done) {
      Feature.search('', function (docs) {
        expect(docs.length).to.be(7);
        done();
      });
    });

    it('performs a case-insensitive search for a command', function (done) {
      Feature.search('git ADD', function (docs) {
        expect(docs).to.eql([{
          name: 'add files',
          examples: [
            { technology: 'Git', snippets: ['git add'] },
            { technology: 'Mercurial', snippets: ['hg add'] },
            { technology: 'Subversion', snippets: ['svn add'] }
          ]
        }]);

        done();
      });
    });

    it('discards extra hidden fields created by MongoDB');

    it('performs a search for a command that does not exist', function (done) {
      Feature.search('git yolo', function (docs) {
        expect(docs.length).to.be(0);
        done();
      });
    });
  });
});
