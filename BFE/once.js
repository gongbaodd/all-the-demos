/**
 * @param {Function} func
 * @return {Function}
 */
function once(func) {
  // your code here

  let result;
  let called = false;

  return function (...args) {
    if (!called) {
      called = true;
      result = func.call(this, ...args);
    }
    return result;
  };
}
