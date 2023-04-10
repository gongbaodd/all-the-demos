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
function parallel(funcs) {
  // your code here
  let err;
  const promises = funcs.map(
    (func) =>
      new Promise((resolve, reject) => {
        func((error, data) => {
          if (err) {
            // if error already happened, just return
            return;
          }

          if (error) {
            reject(error);
            return;
          }
          resolve(data);
        });
      })
  );

  return (callback) => {
    Promise.all(promises)
      .catch((error) => {
        err = error;
      })
      .then((data) => callback(err, data));
  };
}

const async1 = (callback) => {
  callback(undefined, 1);
};

const async2 = (callback) => {
  callback(undefined, 2);
};

const async3 = (callback) => {
  callback(undefined, 3);
};

const createError = (callback) => {
  callback(new Error("error"));
};

const all = parallel([async1, async2, async3, createError]);

all((error, data) => {
  console.log(data); // [1, 2, 3]
}, 1);
