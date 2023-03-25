/**
 * @param {object} source
 * @param {string | string[]} path
 * @param {any} [defaultValue]
 * @return {any}
 */
function get(source, path, defaultValue = undefined) {
  // your code here

  if (typeof path === "string") {
    path = path.split(".");
  }

  for (let i = 0; i < path.length; i++) {
    if (source[path[i]] === undefined) {
      if (path[i].indexOf("[") !== -1) {
        let index = path[i].split("[")[1].split("]")[0];
        source = source[path[i].split("[")[0]][index];

        if (i === path.length - 1) {
          if (source === undefined) {
            return defaultValue;
          }
          return source;
        }
      }

      return defaultValue;
    } else {
      source = source[path[i]];
      if (i === path.length - 1) {
        return source;
      }
    }
  }
}
const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};
console.log(get(obj, "a.b.c[0]"));
