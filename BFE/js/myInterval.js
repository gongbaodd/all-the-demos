const runnerMap = new Map();

/**
 * @param {Function} func
 * @param {number} delay
 * @param {number} period
 * @return {number}
 */
function mySetInterval(func, delay, period) {
  // your code here
  let my_id = 0;
  let count = 0;
  let runner_id;

  const runner = () => {
    runner_id = setTimeout(() => {
      func();
      runner();
    }, delay + period * count);
    runnerMap.set(my_id, { id: runner_id });
    count++;
  };
  runner();

  return my_id;
}

/**
 * @param { number } id
 */
function myClearInterval(id) {
  // your code here
  const runner = runnerMap.get(id);
  clearTimeout(runner?.id);
  runnerMap.delete(id);
}
