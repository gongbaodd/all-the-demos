/**
 * @param {object} obj
 * @param {string} methodName
 */
function spyOn(obj, methodName) {
  // your code here
  const calls = [];
  const proxy = new Proxy(obj[methodName], {
    apply: function (target, thisArg, argumentsList) {
      calls.push(argumentsList);
      return target.apply(thisArg, argumentsList);
    },
  });

  obj[methodName] = proxy;
  return { calls };
}
