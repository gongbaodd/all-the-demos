/**
 * @param {Function} constructor
 * @param {any[]} args - argument passed to the constructor
 * `myNew(constructor, ...args)` should return the same as `new constructor(...args)`
 */
const myNew = (constructor, ...args) => {
  // your code here
  const obj = {};
  Object.setPrototypeOf(obj, constructor.prototype);
  constructor.apply(obj, args);
  return constructor.apply(obj, args) || obj;
};
