/**
 * Doodle2000
 * @class
 */
class Doodle2000 {
  
  /**
   * Returns earliest time for meeting
   * @param {Array} data - Array of raw data for Schedules
   * @param {Number} mins - Meeting duration in minutes
   * @return {String}
   */
  static timeForMeeting(data, mins) {
    var schedules = [];
    var freeSchedules = [];
    var intersected;

    for (var i = 0; i < data.length; i++) {
      let schedule = new Schedule(data[i]);
      freeSchedules[i] = schedule.freeSpaces();
    }

    intersected = freeSchedules[0];

    for (var i = 1; i < freeSchedules.length; i++) {
      intersected = intersected.getIntersection(freeSchedules[i]);
    }

    for (var i = 0; i < intersected.periods.length; i++) {
      if (intersected.periods[i].toMinutes() >= mins) {
        return intersected.periods[i].start;
      }
    }
    
    return false;
  }
}

/**
 * Schedule
 * @class
 */
class Schedule {

  /**
   * @param {Array} data - Persons' schedule in format [['09:00', '10:00'], ... ]
   */
  constructor(data) {
    this.periods = data.map(function(period) {
      return new Period(period[0], period[1]);
    });
  }

  /**
   * Inverts schedules
   * @return {Schedule}
   */
  freeSpaces() {
    var result = [];
      
    if (Time.isLater(this.periods[0].start, '09:00')) {
      result.push(['09:00', this.periods[0].start]);
    }

    for (var j = 0; j < this.periods.length - 1; j++) {
      if (this.periods[j].end != this.periods[j + 1].start) {
        result.push([this.periods[j].end, this.periods[j + 1].start]);
      }
    }

    if (Time.isLater('19:00', this.periods[this.periods.length - 1].end)) {
      result.push([this.periods[this.periods.length - 1].end, '19:00']);
    }

    return new Schedule(result);
  }

  /**
   * Returns intersection
   * @param {Schedule} schedule
   * @return {Schedule}
   */
  getIntersection(schedule) {
    var intersections = [];
    
    for (var i = 0; i < this.periods.length; i++) {
      for (var j = 0; j < schedule.periods.length; j++) {
        let intersection = this.periods[i].getIntersection(schedule.periods[j]);
        
        if (intersection) {
          intersections.push(intersection);
        }
      }
    }

    return new Schedule(intersections);
  }

  /**
   * Returns raw data
   * @return {Array}
   */
  toArray() {
    return this.periods.map(function(period) { return period.getRaw(); });
  }
}

/**
 * Period
 * @class
 */
class Period {

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  /**
   * Returns true if periods intersects
   * @param {Period} period
   * @return {Boolean}
   */
  hasIntersection(period) {
    if (Time.isLaterOrEqual(period.start, this.start) && Time.isLater(this.end, period.start)) {
      return true;
    } else if (Time.isLater(this.start, period.start) && Time.isLater(period.end, this.start)) {
      return true;
    } else if (this.start == period.start && this.end == period.end) {
      return true;
    } else {
      return false;
    }  
  }

  /**
   * Returns intersection of current and given periods or false
   * @param {Period} period
   * @return {Period}
   */
  getIntersection(period) {
    if (this.hasIntersection(period)) {
      return [Time.max(this.start, period.start), Time.min(this.end, period.end)];
    } else {
      return false;
    }
  }

  /**
   * Returns original array [start, end]
   * @return {Array}
   */
  getRaw() {
    return [this.start, this.end];
  }

  /**
   * Returns to number of minutes
   * @return {Number}
   */
  toMinutes() {
    var hrs = parseInt(this.end.split(':')[0]) - parseInt(this.start.split(':')[0]);
    var mins = parseInt(this.end.split(':')[1]) - parseInt(this.start.split(':')[1]);

    return hrs * 60 + mins;
  }
}

/**
 * Time function
 * @namespace
 */
class Time {

  /**
   * Compares times and returns if first one is later than second
   * @param {String} time1
   * @param {String} time2
   * @return {Boolean}
   */
  static isLater(time1, time2) {
    if (parseInt(time1.split(':')[0]) > parseInt(time2.split(':')[0])) {
      return true;
    } else if (parseInt(time1.split(':')[0]) == parseInt(time2.split(':')[0])) {
      if (parseInt(time1.split(':')[1]) > parseInt(time2.split(':')[1])) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Same as Time.Time.isLater() but returns true if times are the same
   * @param {String} time1
   * @param {String} time2
   * @return {Boolean}
   */
  static isLaterOrEqual(time1, time2) {
    return (Time.isLater(time1, time2) || time1 == time2) ? true : false;
  }

  /**
   * Returns max of two given times
   * @param {String} time1
   * @param {String} time2
   * @return {String}
   */
  static max(time1, time2) {
    return Time.isLater(time1, time2) ? time1 : time2;
  }
  
  /**
   * Returns min of two given times
   * @param {String} time1
   * @param {String} time2
   * @return {String}
   */
  static min(time1, time2) {
    return Time.isLater(time1, time2) ? time2 : time1;
  }
}

module.exports = { Doodle2000, Schedule };
