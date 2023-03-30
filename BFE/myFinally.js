/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 */
function myFinally(promise, onFinally) {
  // your code here
  return promise
    .then(async (res) => {
      await onFinally();
      return res;
    })
    .catch(async (err) => {
      await onFinally();
      throw err;
    });
}
