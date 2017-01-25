"use strict";

module.exports = {
  sum: function (a, b) {
    return this.toDecimal(a) + this.toDecimal(b);
  },
  toDecimal: function(a) {
    var result = 0;
    
    for (var i = 0; i < a.length; i++) {
      let char = a.charAt(a.length - 1 - i);
      result += ~~char * Math.pow(2, i);
    }

    return result;
  }
}
