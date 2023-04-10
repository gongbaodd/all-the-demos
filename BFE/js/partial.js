/**
 * @param {Function} func
 * @param {any[]} args
 * @returns {Function}
 */
function partial(func, ...args) {
  // your code here
  const placehplder = partial.placeholder;

  return function (...args2) {
    const allArgs = args.map((i) => (i === placehplder ? args2.shift() : i));
    const self = this;

    return func.apply(this, [...allArgs, ...args2]);
  };
}
