/**
 * @returns { {count: number}}
 */
function createCounter() {
  // your code here
  const counter = {};
  let count = 0;

  Object.defineProperty(counter, "count", {
    get() {
      return count++;
    },
    set(value) {},
    configurable: false,
  });

  return counter;
}

const count = createCounter();
console.log(count.count);
console.log(count.count);
