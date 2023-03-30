class NodeStore {
  /**
   * @param {Node} node
   * @param {any} value
   */
  #store = {};
  #counter = 0;
  set(node, value) {
    let id = this.#counter++;
    node.dataset["id"] = id;
    this.#store[id] = value;
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    let id = node.dataset["id"];
    return id in this.#store;
  }

  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    let id = node.dataset["id"];
    return id in this.#store[id];
  }
}
