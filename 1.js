module.exports = {
  /**
   * Recieves binary numbers represented as a string and do addition.
   * @param {String} a
   * @param {String} b
   * @returns {Number}
   */
  sum: function (a, b) {
    return this.toDecimal(a) + this.toDecimal(b);
  },

  /**
   * Converts string like "10010101" to decimal number
   * @param {String} a
   * @return {Number}
   */
  toDecimal: function(a) {
    var result = 0;
    
    for (var i = 0; i < a.length; i++) {
      let char = a.charAt(a.length - 1 - i);
      result += ~~char * Math.pow(2, i);
    }

    return result;
  }
}
