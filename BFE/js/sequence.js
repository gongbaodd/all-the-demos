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
function sequence(funcs) {
  // your code here
  return (callback, num) => {
    let err = undefined;
    const start = Promise.resolve(num);

    funcs
      .reduce((prev, func, i, arr) => {
        const nextfn = (data) =>
          new Promise((resolve, reject) =>
            func((err, data) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(data);
            }, data)
          );
        return prev.then(nextfn);
      }, start)
      .catch((error) => {
        err = error;
      })
      .then((data) => callback(err, data));
  };
}

const triggerError = (callback) => {
  setTimeout(() => {
    console.log(2);
    callback(new Error("error"));
  }, 10);
};
const asyncTimes2 = (callback, num) => {
  setTimeout(() => {
    console.log(1);
    callback(null, num * 2);
  }, 100);
};
const asyncTimes4 = sequence([asyncTimes2, triggerError, asyncTimes2]);

asyncTimes4((error, data) => {
  console.log(error?.message, data); // 4
}, 1);
