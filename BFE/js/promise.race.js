/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function race(promises) {
  // your code here
  let done = false;

  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((data) => {
          if (done) {
            return;
          }
          done = true;
          resolve(data);
        })
        .catch((error) => {
          if (done) {
            return;
          }
          done = true;
          reject(error);
        });
    });
  });
}
