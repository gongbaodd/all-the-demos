/**
 * @param {Thunk} thunk
 * @return {Thunk}
 */
function flattenThunk(thunk) {
  // your code here
  function runner(cb) {
    thunk((err, data) => {
      if (err) {
        cb(err);
      } else if (typeof data === "function") {
        flattenThunk(data)(cb);
      } else {
        cb(undefined, data);
      }
    });
  }

  return (cb) => runner(cb);
}

const func1 = (cb) => {
  setTimeout(() => cb(null, "ok"), 10);
};

const func2 = (cb) => {
  setTimeout(() => cb(null, func1), 10);
};

const func3 = (cb) => {
  setTimeout(() => cb(null, func2), 10);
};

flattenThunk(func3)((err, data) => {
  console.log(data); // "ok"
});
