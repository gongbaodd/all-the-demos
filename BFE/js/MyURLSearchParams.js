class MyURLSearchParams {
  #params = new Map();
  /**
   * @params {string} init
   */
  constructor(init) {
    if (init) {
      const params = init.split("&");
      for (const param of params) {
        const [name, value] = param.split("=");
        this.append(name, value);
      }
    }
  }

  /**
   * @params {string} name
   * @params {any} value
   */
  append(name, value) {
    if (name.indexOf("?") === 0) {
      name = name.substring(1);
    }

    value = String(value);

    if (this.#params.has(name)) {
      const values = this.#params.get(name);
      values.push(value);
      this.#params.set(name, values);
      return;
    }

    this.#params.set(name, [value]);
  }

  /**
   * @params {string} name
   */
  delete(name) {
    this.#params.delete(name);
  }

  /**
   * @returns {Iterator}
   */
  entries() {
    function* gen() {
      for (const [key, value] of this.#params) {
        for (const v of value) {
          yield [key, v];
        }
      }
    }
    return gen.call(this);
  }

  /**
   * @param {(value, key) => void} callback
   */
  forEach(callback) {
    for (const [key, value] of this.#params) {
      for (const v of value) {
        callback(v, key);
      }
    }
  }

  /**
   * @param {string} name
   * returns the first value of the name
   */
  get(name) {
    return this.#params.get(name)?.[0] || null;
  }

  /**
   * @param {string} name
   * @return {string[]}
   * returns the value list of the name
   */
  getAll(name) {
    return this.#params.get(name) || [];
  }

  /**
   * @params {string} name
   * @return {boolean}
   */
  has(name) {
    return this.#params.has(name);
  }

  /**
   * @return {Iterator}
   */
  keys() {
    return this.#params.keys();
  }

  /**
   * @param {string} name
   * @param {any} value
   */
  set(name, value) {
    this.#params.set(name, [String(value)]);
  }

  // sor all key/value pairs based on the keys
  sort() {
    const sorted = [...this.entries()].sort(([a], [b]) => a.localeCompare(b));
    this.#params = new Map();
    for (const [key, value] of sorted) {
      this.append(key, value);
    }
  }

  /**
   * @return {string}
   */
  toString() {
    const params = [];
    for (const [key, value] of this.#params) {
      for (const v of value) {
        params.push(`${key}=${v}`);
      }
    }
    return params.join("&");
  }

  /**
   * @return {Iterator} values
   */
  values() {
    return [...this.#params.values()].flat();
  }
}

const params = new MyURLSearchParams("?c=2&a=2&a=1&a=2&b=2");
params.sort();
console.log(params.values());
