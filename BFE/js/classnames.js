/**
 * @param {any[]} args
 * @returns {string}
 */
function classNames(...args) {
  // your code here
  let result = "";
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === "string" || typeof args[i] === "number") {
      result += " " + args[i];
    }

    if (args[i] && typeof args[i] === "object") {
      if (Array.isArray(args[i])) {
        result += " " + classNames(...args[i]);
      } else {
        for (let key in args[i]) {
          if (args[i][key]) {
            result += " " + key;
          }
        }
      }
    }
  }
  return result.trim();
}
