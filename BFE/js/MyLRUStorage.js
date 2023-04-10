// This is a JavaScript coding problem from BFE.dev

/**
 * @typedef {object} OriginData
 * @property {string} origin
 * @property {number} lastUsed
 * @property {number} size
 * @property {boolean} persistent
 */

class MyLRUStorage {
  #queue = new Set();
  #size = 0;
  /**
   * @param {number} capacity
   * @param {() => number} getTimestamp
   */
  constructor(capacity, getTimestamp) {
    this.capacity = capacity;
    this.getTimestamp = getTimestamp;
  }

  #evictOldest() {
    let oldest;
    for (const item of this.#queue) {
      if (!item.persistent) {
        if (!oldest || item.lastUsed < oldest.lastUsed) {
          oldest = item;
        }
      }
    }

    if (oldest) {
      this.#queue.delete(oldest);
      this.#size -= oldest.size;
    }

    console.log("evict", oldest);

    return oldest;
  }

  #isRestPersistent() {
    for (const item of this.#queue) {
      if (!item.persistent) {
        return false;
      }
    }

    return true;
  }

  /**
   * @param {string} origin
   * @returns {OriginData | undefined}
   */
  getData(origin) {
    let data;
    for (const item of this.#queue) {
      if (item.origin === origin) {
        data = item;
        break;
      }
    }

    if (data) {
      data.lastUsed = this.getTimestamp();
      return data;
    }
  }

  /**
   * @param {string} origin
   * @param {number} size
   * @returns {boolean}
   */
  setData(origin, size) {
    let newSize = this.#size + size;
    const data = this.getData(origin);
    if (data) {
      newSize -= data.size;
      this.clearData(origin);
    }

    const evicted = [];
    while (newSize > this.capacity) {
      const oldest = this.#evictOldest();
      oldest && evicted.push(oldest);

      newSize = this.#size + size;
      if (newSize > this.capacity && this.#isRestPersistent()) {
        for (const item of evicted) {
          this.#queue.add(item);
        }
        data && this.#queue.add(data);
        return false;
      }
    }

    this.#queue.add({
      origin,
      lastUsed: this.getTimestamp(),
      size,
      persistent: false,
    });
    this.#size = newSize;

    return true;
  }

  /**
   * @param {string} origin
   * @returns {void}
   */
  clearData(origin) {
    const data = this.getData(origin);
    if (data) {
      this.#queue.delete(data);
      this.#size -= data.size;
    }
  }

  /**
   * @param {string} origin
   * @returns {void}
   */
  makePersistent(origin) {
    const data = this.getData(origin);
    if (data) {
      data.persistent = true;
    }
  }
}

function __getTimestamp() {
  return performance.now();
}

function expect(...args) {
  console.log(args);
  return {
    toBe: () => {},
    toBeUndefined: () => {},
  };
}

const storage = new MyLRUStorage(10, __getTimestamp);
storage.setData("a", 1);
storage.setData("b", 3);
storage.setData("c", 6);
const result = storage.setData("a", 4);
expect(result).toBe(true);
expect(storage.getData("a").size).toBe(4);
