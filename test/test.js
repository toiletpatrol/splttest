var sum = require('../sum');

var assert = require('assert');


describe('Base 2 to base 10', function() {
  it('should convert "10" to 2', function() {
    assert.equal(sum.toDecimal("10"), 2);
  })
});

describe('Binary addition', function() {
  it('should return 7 for "101" and "10"', function() {
    assert.equal(sum.sum("101", "10"), 7);
  })
});
/*
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
*/