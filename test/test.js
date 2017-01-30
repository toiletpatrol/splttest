var assert = require('assert');

// 1.js
var binCalc = require('../1');

describe('Task 1 (1.js)', function() {
  
  describe('Base 2 to base 10:', function() {
    
    it('should convert "10" to 2', function() {
      assert.equal(binCalc.toDecimal("10"), 2);
    });

    it('should convert "110" to 6', function() {
      assert.equal(binCalc.toDecimal("110"), 6);
    });

    it('should convert "11001011100" to 1628', function() {
      assert.equal(binCalc.toDecimal("11001011100"), 1628);
    });

  });

  describe('Binary addition:', function() {
    
    it('should return 4 for "10" and "10"', function() {
      assert.equal(binCalc.sum("10", "10"), 4);
    });

    it('should return 2 for "10" and "0"', function() {
      assert.equal(binCalc.sum("10", "0"), 2);
    });

    it('should return 7 for "101" and "10"', function() {
      assert.equal(binCalc.sum("101", "10"), 7);
    });

  });

});

// 2.js
describe('Task 2 (2.js)', function() {
  
  var { zero, one, two, three, four, five, six, seven, eight, nine, plus, minus, times, dividedBy } = require('../2');

  describe('Calculations', function() {
    
    it('should return 35 for seven(times(five()))', function() {
      assert.equal(seven(times(five())), 35);
    });

    it('should return 13 for four(plus(nine()))', function() {
      assert.equal(four(plus(nine())), 13);
    });

    it('should return 5 for eight(minus(three()))', function() {
      assert.equal(eight(minus(three())), 5);
    });

    it('should return 3 for six(dividedBy(two()))', function() {
      assert.equal(six(dividedBy(two())), 3);
    });

  });

});


// 3.js
describe('Task 3 (3.js)', function() {

  var defaultArguments = require('../3')['defaultArguments'];

  var add = function (a, b) { return a + b; };
  var add_;

  describe('defaultArguments = { b: 9 }', function() {

    it('add_(10) returns 19', function() {
      add_ = defaultArguments(add, { b: 9 });
      assert.equal(add_(10), 19);
    });

    it('add_(10, 7) returns 17', function() {
      add_ = defaultArguments(add, { b: 9 });
      assert.equal(add_(10, 7), 17);
    });

    it('add_() returns NaN', function() {
      add_ = defaultArguments(add, { b: 9 });
      assert.equal(isNaN(add_()), true);
    });

  });

  describe('defaultArguments = { b: 3, a: 2 }', function() {

    it('add_(10) returns 13', function() {
      add_ = defaultArguments(add_, { b: 3, a: 2 });
      assert.equal(add_(10), 13);
    });
    
    it('add_() returns 5', function() {
      add_ = defaultArguments(add_, { b: 3, a: 2 });
      assert.equal(add_(), 5);
    });

  });

  describe('defaultArguments = { c: 3 }', function() {

    it('add_(10) returns NaN', function() {
      add_ = defaultArguments(add_, { c: 3 });
      assert.equal(isNaN(add_(10)), true);
    });
    
    it('add_(10, 10) returns 20', function() {
      add_ = defaultArguments(add_, { c: 3 });
      assert.equal(add_(10, 10), 20);
    });

  });

});

// 4.js
describe('Task 3 (3.js)', function() {
  var { Doodle2000, Schedule } = require('../4');

  var schedules = [
    [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
    [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
    [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
  ];

  describe('Schedules', function() {

    it(`Dude A's free spaces: [['11:30', '13:30'], ['17:30', '17:45']]`, function() {
      var rightValue = [['11:30', '13:30'], ['17:30', '17:45']].toString();
      var busy = new Schedule(schedules[0]);
      var spaces = busy.freeSpaces(); 
      assert.equal(spaces.toArray().toString(), rightValue);
    });

    it(`Dude B's free spaces: [['09:00', '09:15'], ['12:00', '14:00'], ['16:30', '17:00'], ['17:30', '19:00']]`, function() {
      var rightValue = [['09:00', '09:15'], ['12:00', '14:00'], ['16:30', '17:00'], ['17:30', '19:00']].toString();
      var busy = new Schedule(schedules[1]);
      var spaces = busy.freeSpaces(); 
      assert.equal(spaces.toArray().toString(), rightValue);
    });

    it(`Dude C's free spaces: [['09:00', '11:30'], ['12:15', '15:00'], ['16:30', '17:45']]`, function() {
      var rightValue = [['09:00', '11:30'], ['12:15', '15:00'], ['16:30', '17:45']].toString();
      var busy = new Schedule(schedules[2]);
      var spaces = busy.freeSpaces(); 
      assert.equal(spaces.toArray().toString(), rightValue);
    });

    it('Earliest time for meeting is 12:15', function() {
      assert.equal(Doodle2000.timeForMeeting(schedules, 60), '12:15');
    });

  });

});