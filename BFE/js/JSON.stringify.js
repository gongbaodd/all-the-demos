/**
 * type SerializablePrimitives = undefined | null | number | string | bigint | boolean

  * type Serializable = {
    [index: string]: Serializable
  } | Serializable[] | SerializablePrimitives
*/

const TAG = "____TAG____";

/**
 * @params {Serializable} data
 * @returns {string}
 */
const stringify = (data) => {
  // your code here
  return JSON.stringify(data, (_key, value) => {
    if (typeof value === "bigint") {
      return TAG + value.toString() + "n";
    }

    if (undefined === value) {
      return TAG + "undefined";
    }

    if (typeof value === "number") {
      if (isNaN(value)) {
        return TAG + "NaN";
      }

      if (value === Infinity) {
        return TAG + "Infinity";
      }

      if (value === -Infinity) {
        return TAG + "-Infinity";
      }
    }

    return value;
  });
};

/**
 * @params {string} data
 * @returns {Serializable}
 */
const parse = (data) => {
  // your code here
  const result = JSON.parse(data, (_key, value) => {
    if (typeof value === "string") {
      if (!value.includes(TAG)) {
        return value;
      }

      value = value.slice(TAG.length);

      if (value.endsWith("n")) {
        return BigInt(value.slice(0, -1));
      }

      if (value === "undefined") {
        return TAG + "undefined";
      }

      if (value === "NaN") {
        return NaN;
      }

      if (value === "Infinity") {
        return Infinity;
      }

      if (value === "-Infinity") {
        return -Infinity;
      }
    }

    return value;
  });

  function walk(data) {
    if (data) {
      if (Array.isArray(data)) {
        data.forEach((item, i) => {
          if (item === TAG + "undefined") {
            data[i] = undefined;
            return;
          }

          walk(item);
        });
      } else if (typeof data === "object") {
        for (const key in data) {
          if (data[key] === TAG + "undefined") {
            data[key] = undefined;
            continue;
          }
          walk(data[key]);
        }
      }
    }
  }

  walk(result);

  if (result === TAG + "undefined") {
    return undefined;
  }

  return result;
};

const input = { a: undefined, b: { c: null, d: [Infinity] } };
console.log(stringify(input));
console.log(parse(stringify(input)));
