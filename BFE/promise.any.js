/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
  // your code here

  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      reject(new AggregateError("No Promise in Promise.any was resolved", []));
      return;
    }

    let count = 0;
    let done = false;
    let errors = [];
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise
        .then((data) => {
          if (done) {
            return;
          }
          done = true;
          resolve(data);
        })
        .catch((error) => {
          count++;
          errors[i] = error;
          if (count === promises.length) {
            reject(
              new AggregateError(
                "No Promise in Promise.any was resolved",
                errors
              )
            );
          }
        });
    }
  });
}
