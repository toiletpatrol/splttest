var Doodle2000 = {
  timeForMeeting: function(data, mins) {
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
};

// Class Schedule
function Schedule(data) {
  this.periods = data.map(function(period) {
    return new Period(period[0], period[1]);
  });
}

Schedule.prototype.freeSpaces = function() {
  var result = [];
    
  if (isLater(this.periods[0].start, '09:00')) {
    result.push(['09:00', this.periods[0].start]);
  }

  for (var j = 0; j < this.periods.length - 1; j++) {
    if (this.periods[j].end != this.periods[j + 1].start) {
      result.push([this.periods[j].end, this.periods[j + 1].start]);
    }
  }

  if (isLater('19:00', this.periods[this.periods.length - 1].end)) {
    result.push([this.periods[this.periods.length - 1].end, '19:00']);
  }

  return new Schedule(result);
};

Schedule.prototype.getIntersection = function(schedule) {
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
};

Schedule.prototype.toArray = function() {
  return this.periods.map(function(period) { return period.getRaw(); });
};

// Class Period
function Period(start, end) {
  this.start = start;
  this.end = end;
}

Period.prototype.hasIntersection = function(period) {
  if (isLaterOrEqual(period.start, this.start) && isLater(this.end, period.start)) {
    return true;
  } else if (isLater(this.start, period.start) && isLater(period.end, this.start)) {
    return true;
  } else if (this.start == period.start && this.end == period.end) {
    return true;
  } else {
    return false;
  }  
};

Period.prototype.getIntersection = function (period) {
  if (this.hasIntersection(period)) {
    return [max(this.start, period.start), min(this.end, period.end)];
  } else {
    return false;
  }
};

Period.prototype.getRaw = function () {
  return [this.start, this.end];
};

Period.prototype.toMinutes = function() {
  var hrs = parseInt(this.end.split(':')[0]) - parseInt(this.start.split(':')[0]);
  var mins = parseInt(this.end.split(':')[1]) - parseInt(this.start.split(':')[1]);

  return hrs * 60 + mins;
}

// Time functions
function isLater(time1, time2) {
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

function isLaterOrEqual(time1, time2) {
  return (isLater(time1, time2) || time1 == time2) ? true : false;
}

function max(time1, time2) {
  return isLater(time1, time2) ? time1 : time2;
}

function min(time1, time2) {
  return isLater(time1, time2) ? time2 : time1;
}

// Exports
module.exports = { Doodle2000, Schedule };
