// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  // your code here
  const queue = [];
  queue.push(async () => {
    logFn(`Hi, I'm ${name}.`);
  });

  setTimeout(async () => {
    for (const fn of queue) {
      await fn();
    }
  });

  return {
    eat(food) {
      queue.push(() => {
        logFn(`Eat ${food}.`);
      });
      return this;
    },
    sleep(time) {
      queue.push(async () => {
        await wait(time);
      });
      return this;
    },
    sleepFirst(time) {
      queue.unshift(async () => {
        await wait(time);
      });
      return this;
    },
  };

  function wait(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        logFn(`Wake up after ${time} second${time === 1 ? "" : "s"}.`);
        resolve();
      }, time * 1000);
    });
  }
}

// LazyMan("Jack", console.log);
// LazyMan("Jack", console.log).eat("banana").sleep(10).eat("apple").sleep(1);
// LazyMan("Jack", console.log).eat("banana").sleepFirst(10).eat("apple").sleep(1);
