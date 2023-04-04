Array.prototype.myReduce = function (...args) {
  // your code here
  if (this.length === 0 && args.length === 1) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  const callback = args[0];
  let accumulator = args[1];
  let i = 0;
  if (accumulator === undefined && args.length === 1) {
    accumulator = this[0];
    i = 1;
  }

  for (; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

console.log([].myReduce((a, b) => a + b, "init"));
