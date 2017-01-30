// from https://davidwalsh.name/javascript-arguments
function getFunctionArgs (func) {
  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
 
  var a = args.split(',').map(function(arg) {
    return arg.replace(/\/\*.*\*\//, '').trim().replace(/=.*/, '');
  }).filter(function(arg) {
    return arg;
  });


  return a;
};

// from http://stackoverflow.com/questions/3179861/javascript-get-function-body
function getFunctionBody(func) {
  var entire = func.toString();
  return entire.toString().substring(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
}

function appendDefaults (args, defaultArguments) {
  for (var i = 0; i < args.length; i++) {
    if (defaultArguments[args[i]]) {
      args[i] += `=${defaultArguments[args[i]]}`;
    }
  }

  return args;
}

module.exports = {

  defaultArguments: function(func, defaultArguments) {
    var args = getFunctionArgs(func);
    var body = getFunctionBody(func);
    
    args = appendDefaults(args, defaultArguments);

    return new Function(args.join(','), body);
  }

};
