var expect = require('expect.js');
var helpers = require('../helpers');

describe('helpers', function () {
  describe('.toArray()', function () {
    context('when given an array', function () {
      it('returns the unmodified array', function () {
        expect(helpers.toArray([1, 2, 3])).to.eql([1, 2, 3]);
      });
    });

    context('when given an item', function () {
      it('returns an array of length 1 containing the item', function () {
        expect(helpers.toArray('item')).to.eql(['item']);
      });
    });
  });
});
