/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */

function memoizeOne(func, isEqual) {
  // your code here
  let lastArgs = [];
  let lastResult;
  let lastThis;
  let calledOnce = false;
  isEqual = isEqual || ((a, b) => JSON.stringify(a) === JSON.stringify(b));

  return function (...args) {
    if (calledOnce && isEqual(lastArgs, args) && lastThis === this) {
      return lastResult;
    }
    lastThis = this;
    lastArgs = args;
    lastResult = func.call(this, ...args);
    calledOnce = true;
    return lastResult;
  };
}

let callCount = 0;
function funcThis(b) {
  callCount += 1;
  console.log(callCount); // 1 1 2 2 3 4
  return `${this.a}_${b}`;
}
const memoed = memoizeOne(funcThis);
const a = {
  a: 1,
  memoed,
};

const b = {
  a: 2,
  memoed,
};

console.log(a.memoed(2)); // 1_2
console.log(a.memoed(2)); // 1_2
console.log(a.memoed(3)); // 1_3
console.log(a.memoed(3)); // 1_3

console.log(b.memoed(3)); // 2_3
console.log(a.memoed(3)); // 1_3
