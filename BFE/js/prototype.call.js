Function.prototype.mycall = function (thisArg, ...args) {
  // your code here

  const context = Object(thisArg || window);
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];

  return result;
};
