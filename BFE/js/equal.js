/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function isEqual(a, b, seen = new Set()) {
  // your code here
  if (a === b) {
    return true;
  }

  if (typeof a === "object" && typeof b === "object") {
    if (a === null || b === null) {
      return false;
    }

    if (seen.has(a) || seen.has(b)) {
      return true;
    }

    seen.add(a);
    seen.add(b);

    let aKeys = Object.keys(a);
    let bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (let i = 0; i < aKeys.length; i++) {
      if (!isEqual(a[aKeys[i]], b[aKeys[i]], seen)) {
        return false;
      }
    }

    return true;
  }

  return false;
}

const a = {};
a.self = a;
const b = { self: a };
const c = {};
c.self = c;
const d = { self: { self: a } };
const e = { self: { self: b } };

console.log(isEqual(a, c));
