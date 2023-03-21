/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  // your code here
  let count = 0;
  let results = [];
  promises = promises.map((promise) => Promise.resolve(promise));

  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve(results);
    }

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise
        .then((data) => {
          results[i] = data;
        })
        .catch((error) => {
          reject(error);
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
