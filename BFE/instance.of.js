/**
 * @param {any} obj
 * @param {target} target
 * @return {boolean}
 */
function myInstanceOf(obj, target) {
  // your code here

  if (typeof obj !== "object" || obj === null) return false;
  let proto = Object.getPrototypeOf(obj);
  while (true) {
    if (proto === null) return false;
    if (proto === target.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
