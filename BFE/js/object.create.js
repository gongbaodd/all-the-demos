/**
 * @param {any} proto
 * @return {object}
 */
function myObjectCreate(proto) {
  // your code here

  if (proto === null) {
    throw new TypeError("Object prototype may not be null: " + proto);
  }

  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError("Object prototype may only be an Object: " + proto);
  }

  const res = {};
  Object.setPrototypeOf(res, proto);
  return res;
}
