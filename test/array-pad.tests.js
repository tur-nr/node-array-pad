var assert = require('assert')
  , pad = require('../');

describe('#pad', function() {
  it('should throw TypeError on none arrays', function() {
    assert.throws(function() { pad(); }, TypeError); 
    assert.throws(function() { pad(undefined, 1); }, TypeError); 
    assert.throws(function() { pad(null, 1); }, TypeError); 
    assert.throws(function() { pad(NaN, 1); }, TypeError); 
    assert.throws(function() { pad(true, 1); }, TypeError); 
    assert.throws(function() { pad('', 1); }, TypeError); 
    assert.throws(function() { pad(0, 1); }, TypeError); 
    assert.throws(function() { pad(function() {}, 1); }, TypeError); 
    assert.throws(function() { pad({}, 1); }, TypeError); 
  }); 

  it('should throw TypeError with none integer lengths', function() {
    assert.throws(function() { pad([]); }, TypeError); 
    assert.throws(function() { pad([], undefined); }, TypeError); 
    assert.throws(function() { pad([], null); }, TypeError); 
    assert.throws(function() { pad([], NaN); }, TypeError); 
    assert.throws(function() { pad([], true); }, TypeError); 
    assert.throws(function() { pad([], ''); }, TypeError); 
    assert.throws(function() { pad([], 0.5); }, TypeError); 
    assert.throws(function() { pad([], function() {}); }, TypeError); 
    assert.throws(function() { pad([], {}); }, TypeError); 
  });

  it('should pad right array to given length', function() {
    var one
      , two
      , three;

    one = pad([], 3); 
    assert.ok(Array.isArray(one));
    assert.equal(one.length, 3);

    two = pad(one, 2);
    assert.ok(Array.isArray(two));
    assert.equal(two.length, 3);

    three = pad(two, 5);
    assert.ok(Array.isArray(three));
    assert.equal(three.length, 5);
  });

  it('should pad left array to given length', function() { 
    var one
      , two
      , three;

    one = pad([], -3); 
    assert.ok(Array.isArray(one));
    assert.equal(one.length, 3);

    two = pad(one, -2);
    assert.ok(Array.isArray(two));
    assert.equal(two.length, 3);

    three = pad(two, -5);
    assert.ok(Array.isArray(three));
    assert.equal(three.length, 5);
  });

  it('should pad right with given values', function() {
    var one
      , two
      , three;

    one = pad([1,2,3], 5, 0);
    assert.deepEqual(one, [1,2,3,0,0]);

    two = pad(one, 3, 0);
    assert.deepEqual(two, [1,2,3,0,0]);

    three = pad(two, 7, 9);
    assert.deepEqual(three, [1,2,3,0,0,9,9]);
  });

  it('should pad left with given values', function() {
    var one
      , two
      , three;

    one = pad([1,2,3], -5, 0);
    assert.deepEqual(one, [0,0,1,2,3]);

    two = pad(one, -3, 0);
    assert.deepEqual(two, [0,0,1,2,3]);

    three = pad(two, -7, 9);
    assert.deepEqual(three, [9,9,0,0,1,2,3]);
  });

  it('should augment original array', function() {
    var array = []
      , padded;

    padded = pad(true, array, 3, null);
    assert.strictEqual(padded, array);
    assert.equal(padded.length, 3);
  });
});
