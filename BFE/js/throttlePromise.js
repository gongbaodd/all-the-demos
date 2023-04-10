/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
function throttlePromises(funcs, max) {
  // your code here
  const run = async () => {
    let results = [];

    for (let i = 0; i < funcs.length; i += max) {
      const res = await Promise.all(
        funcs.slice(i, i + max).map((func) => func())
      );
      results = results.concat(res);
    }

    return results;
  };

  return run();
}
