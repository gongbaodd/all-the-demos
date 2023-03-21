class BrowserHistory {
  #history = [];
  #current = 0;
  /**
   * @param {string} url
   * if url is set, it means new tab with url
   * otherwise, it is empty new tab
   */
  constructor(url) {
    // if (url) {
    this.visit(url);
    // }
  }
  /**
   * @param { string } url
   */
  visit(url) {
    // add url to history
    if (this.#current < this.#history.length - 1) {
      this.#history = this.#history.slice(0, this.#current + 1);
    }

    this.#history.push(url);
    this.#current = this.#history.length - 1;
  }

  /**
   * @return {string} current url
   */
  get current() {
    return this.#history[this.#current];
  }

  // go to previous entry
  goBack() {
    if (this.#current > 0) {
      this.#current--;
    }
  }

  // go to next visited url
  forward() {
    if (this.#current < this.#history.length - 1) {
      this.#current++;
    }
  }
}
