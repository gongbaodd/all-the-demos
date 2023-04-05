/**
 * @param {object} obj
 * @param {string | string[]} path
 * @param {any} value
 */
function set(obj, path, value) {
  // your code here
  const pathArr = Array.isArray(path) ? path : path.split(".");
  let isArray = false;
  console.log(pathArr);

  let key = pathArr.shift();

  if (key.includes("[")) {
    const index = key.slice(key.indexOf("[") + 1, key.indexOf("]"));
    key = key.slice(0, key.indexOf("["));
    pathArr.unshift(index);
    isArray = true;
  }

  if (pathArr.length === 0) {
    obj[key] = value;
    return obj;
  }

  if (!obj[key]) {
    obj[key] = isArray ? [] : {};
  }

  set(obj[key], pathArr, value);

  return obj;
}

const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};
// set(obj, "a.b.c", "BFE");
// console.log(obj.a.b.c); // "BFE"

// set(obj, "a.b.c.0", "BFE");
// console.log(obj.a.b.c[0]); // "BFE"

// set(obj, "a.b.c[1]", "BFE");
// console.log(obj.a.b.c[1]); // "BFE"

// set(obj, ["a", "b", "c", "2"], "BFE");
// console.log(obj.a.b.c[2]); // "BFE"

// set(obj, "a.b.c[3]", "BFE");
// console.log(obj.a.b.c[3]); // "BFE"

// set(obj, "a.c.d[0]", "BFE");
// // valid digits treated as array elements
// console.log(obj.a.c.d[0]); // "BFE"

// set(obj, "a.c.d.01", "BFE");
// // invalid digits treated as property string
// console.log(obj.a.c.d["01"]); // "BFE"
