var assert = require('assert');
var helpers = require('../helpers');

describe('helpers', function () {
  describe('.toArray()', function () {
    context('when given an array', function () {
      it('returns the unmodified array', function () {
        assert.deepEqual(helpers.toArray([1, 2, 3]), [1, 2, 3]);
      });
    });

    context('when given an item', function () {
      it('returns an array of length 1 containing the item', function () {
        assert.deepEqual(helpers.toArray('item'), ['item']);
      });
    });
  });
});
