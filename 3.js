/**
 * Parses function and return set of source function's parameters
 * @author: https://davidwalsh.name/javascript-arguments
 * @param {Function} func
 * @return {Array}
 */
function getFunctionArgs (func) {
  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
 
  return args.split(',').map(function(arg) {
    return arg.replace(/\/\*.*\*\//, '').trim().replace(/=.*/, '');
  }).filter(function(arg) {
    return arg;
  });
};

/**
 * Extrudes function's body
 * @author: http://stackoverflow.com/questions/3179861/javascript-get-function-body
 * @param {Function} func
 * @return {String}
 */
function getFunctionBody(func) {
  var entire = func.toString();
  return entire.toString().substring(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
}

/**
 * Modify recieved array of arguments. Appends default values to matching arguments
 * @param {Array} args
 * @param {Object} defaultArguments - like { a: 1, b: 1 }
 * @return {Array}
 */
function appendDefaults (args, defaultArguments) {
  for (var i = 0; i < args.length; i++) {
    if (defaultArguments[args[i]]) {
      args[i] += `=${defaultArguments[args[i]]}`;
    }
  }

  return args;
}

module.exports = {

  /**
   * Modifies recieved function by adding default values to matching arguments.
   * @param {Function} func - Source function
   * @param {Object} defaultArguments
   * @return {Function}
   */
  defaultArguments: function(func, defaultArguments) {
    var args = getFunctionArgs(func);
    var body = getFunctionBody(func);
    
    args = appendDefaults(args, defaultArguments);

    return new Function(args.join(','), body);
  }

};
