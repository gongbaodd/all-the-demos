function cloneDeep(data, hash = new WeakMap()) {
  // your code here
  if (undefined === data || null === data) {
    return data;
  }

  if (typeof data === "object") {
    let result = Array.isArray(data) ? [] : {};

    if (hash.has(data)) {
      return hash.get(data);
    }
    hash.set(data, result);

    if (Array.isArray(data)) {
      data.forEach((d) => result.push(cloneDeep(d, hash)));
      return result;
    }

    for (let key in data) {
      result[key] = cloneDeep(data[key], hash);
    }

    Object.getOwnPropertySymbols(data).forEach((symbol) => {
      result[symbol] = cloneDeep(data[symbol], hash);
    });

    return result;
  }
  return data;
}

const obj = { a: { b: {} } };
obj.a.b.c = obj.a;
const clone = cloneDeep(obj);
console.log(obj);
console.log(clone);
