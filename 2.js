// Meta Number
function metaNumber(number, raw) {
  return (typeof raw == 'object') ? calc(number, raw.number, raw.operation) : number;
}

// Calculation
function calc(leftOperand, rightOperand, operation) {
  if (operation == '+') return (leftOperand + rightOperand);
  if (operation == '-') return (leftOperand - rightOperand);
  if (operation == '*') return (leftOperand * rightOperand);
  if (operation == '/') return (leftOperand / rightOperand);
}

// Numbers
function zero(raw) {
  return metaNumber(0, raw);
}

function one(raw) {
  return metaNumber(1, raw);
}

function two(raw) {
  return metaNumber(2, raw);
}

function three(raw) {
  return metaNumber(3, raw);
}

function four(raw) {
  return metaNumber(4, raw);
}

function five(raw) {
  return metaNumber(5, raw);
}

function six(raw) {
  return metaNumber(6, raw);
}

function seven(raw) {
  return metaNumber(7, raw);
}

function eight(raw) {
  return metaNumber(8, raw);
}

function nine(raw) {
  return metaNumber(9, raw);
}

// Operations
function plus(number) {
  return {number, operation: '+'};
}

function minus(number) {
  return {number, operation: '-'};
}

function times(number) {
  return {number, operation: '*'};
}

function dividedBy(number) {
  return {number, operation: '/'};
}

module.exports = { zero, one, two, three, four, five, six, seven, eight, nine, plus, minus, times, dividedBy };