var assert = require('assert');
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
        assert.equal(7, docs.length);
        done();
      });
    });

    it('performs a case-insensitive search for a command', function (done) {
      Feature.search('git ADD', function (docs) {
        assert.equal(1, docs.length)
        done();
      });
    });

    it('performs a search for a command that does not exist', function (done) {
      Feature.search('git yolo', function (docs) {
        assert.equal(0, docs.length);
        done();
      });
    });
  });
});
