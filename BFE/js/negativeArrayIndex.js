/**
 * @param {any[]} arr
 * @returns {?} - sorry no type hint for this
 */
function wrap(arr) {
  // your code here
  return new Proxy(arr, {
    get: function (target, prop) {
      if (prop === Symbol.iterator) {
        return Reflect.get(target, prop);
      }

      if (prop < 0) {
        prop = target.length + Number(prop);
      }
      return target[prop];
    },
    set: function (target, prop, value) {
      if (prop < 0) {
        if (target.length + Number(prop) < 0) {
          throw new Error("Index out of range");
        }
        prop = target.length + Number(prop);
      }
      target[prop] = value;
      return true;
    },
  });
}

const arr = wrap([1, 2, 3]);
arr.push(4);
