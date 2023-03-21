/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  // your code here
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const result = typeof target === "object" ? target : Object(target);

  console.log(Object.getOwnPropertyDescriptor(result, "foo"));

  sources
    .filter((s) => {
      return s !== null && s !== undefined;
    })
    .forEach((source) => {
      Object.keys(source).forEach((key) => {
        const { writable } = Object.getOwnPropertyDescriptor(result, key) ?? {};
        if (writable === false) {
          throw new TypeError("Cannot assign to read only property");
        }
        result[key] = source[key];
      });

      for (let key of Object.getOwnPropertySymbols(source)) {
        result[key] = source[key];
      }
    });

  return result;
}

const target = Object.defineProperty({}, "foo", {
  value: 1,
  writable: false,
}); // target.foo is a read-only property

objectAssign(1, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
