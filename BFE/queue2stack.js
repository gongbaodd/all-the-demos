/* you can use this Queue which is bundled together with your code
class Queue {
  enqueue(element) {
    // add new element to the queue
  }
  peek() { 
    // return the head element
  }
  dequeue() { 
    // remove head element from the queue
  }
  size() { 
    // return the queue size
  }
}
*/

// you need to complete the following Stack, using only Queue
class Stack {
  #queue1 = new Queue(); // 1<2<3<4
  #queue2 = new Queue();
  constructor() {}
  push(element) {
    // push an element into the stack
    this.#queue1.enqueue(element);
  }
  peek() {
    // get the top element
    while (this.#queue1.size() > 1) {
      this.#queue2.enqueue(this.#queue1.dequeue());
    }
    const top = this.#queue1.peek();
    this.#queue2.enqueue(this.#queue1.dequeue());
    while (this.#queue2.size() > 0) {
      this.#queue1.enqueue(this.#queue2.dequeue());
    }
    return top;
  }
  pop() {
    // remove top element from stack
    while (this.#queue1.size() > 1) {
      this.#queue2.enqueue(this.#queue1.dequeue());
    }
    const top = this.#queue1.dequeue();
    while (this.#queue2.size() > 0) {
      this.#queue1.enqueue(this.#queue2.dequeue());
    }
    return top;
  }
  size() {
    // return count of elements
    return this.#queue1.size();
  }
}
