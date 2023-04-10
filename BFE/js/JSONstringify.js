/**
 * @param {any} data
 * @return {string}
 */
function stringify(data) {
  // your code here
  if (typeof data === "bigint") {
    throw new Error("BigInt is not supported");
  }

  if (typeof data === "number" && isNaN(data)) {
    return "null";
  }

  if (data === null) {
    return "null";
  }

  if (data === undefined) {
    return "null";
  }

  if (data === Infinity) {
    return "null";
  }

  if (typeof data === "string") {
    return `"${data}"`;
  }

  if (typeof data === "symbol") {
    return "null";
  }

  if (typeof data === "function") {
    return;
  }

  if (typeof data !== "object") {
    return data.toString();
  }

  if (Array.isArray(data)) {
    return `[${data.map(stringify).join(",")}]`;
  }

  if (data instanceof Date) {
    return `"${data.toISOString()}"`;
  }

  let objstr = "{";
  Object.keys(data).forEach((key, i) => {
    if (data[key] === undefined) {
      return;
    }

    if (typeof data[key] === "function") {
      return;
    }

    objstr += `"${key}":${stringify(data[key])}`;
    if (i < Object.keys(data).length - 1) {
      objstr += ",";
    }
  });
  objstr += "}";
  return objstr;
}
