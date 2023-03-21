/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  // your code here
  promises = promises.map((promise) => Promise.resolve(promise));

  const results = [];
  let count = 0;

  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise
        .then((data) => {
          results[i] = { status: "fulfilled", value: data };
        })
        .catch((error) => {
          results[i] = { status: "rejected", reason: error };
        })
        .finally(() => {
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        });
    }
  });
}
allSettled([1, 2, 3, Promise.resolve(4)]).then((data) => console.log(data));
