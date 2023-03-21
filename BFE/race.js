/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function race(funcs) {
  // your code here
  let finished = false;

  return (callback) => {
    funcs.forEach((func) => {
      func((error, data) => {
        if (finished) {
          return;
        }
        finished = true;
        if (error) {
          callback(error, undefined);
          return;
        }
        callback(undefined, data);
      });
    });
  };
}
