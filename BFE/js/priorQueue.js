// complete the implementation
class PriorityQueue {
  #stack = [];
  compare = null;

  /**
   * @param {(a: any, b: any) => -1 | 0 | 1} compare -
   * compare function, similar to parameter of Array.prototype.sort
   */
  constructor(compare) {
    this.compare = compare;
  }

  /**
   * return {number} amount of items
   */
  size() {
    return this.#stack.length;
  }

  /**
   * returns the head element
   */
  peek() {
    return this.#stack[0];
  }

  /**
   * @param {any} element - new element to add
   */
  add(element) {
    this.#stack.push(element);
    this.#stack.sort(this.compare);
  }

  /**
   * remove the head element
   * @return {any} the head element
   */
  poll() {
    return this.#stack.shift();
  }
}
const pq = new PriorityQueue((a, b) => a - b);
pq.add(5);
pq.add(3);
pq.add(1);
pq.add(4);
pq.add(2);
const result = [];
while (pq.size() > 0) {
  result.push(pq.poll());
}
console.log(result);
