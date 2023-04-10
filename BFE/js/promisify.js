/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
function promisify(func) {
  // your code here
  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

function func(arg1, arg2, arg3, callback) {
  setTimeout(() => {
    callback(null, this.foo);
  }, 50);
}

const obj = {
  foo: "BFE",
  promisified: promisify(func),
};

obj.promisified(1, 2, 3).then((data) => {
  console.log(data);
});
