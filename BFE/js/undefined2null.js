/**
 * @param {any} arg
 * @returns any
 */
function undefinedToNull(arg) {
  // your code here

  if (Array.isArray(arg)) {
    return arg.map((item) => undefinedToNull(item));
  }

  if (typeof arg === "object" && arg !== null) {
    const result = {};
    for (let key in arg) {
      result[key] = undefinedToNull(arg[key]);
    }
    return result;
  }

  if (typeof arg === "undefined") {
    return null;
  }

  return arg;
}
