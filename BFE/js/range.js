/**
 * @param {integer} from
 * @param {integer} to
 */
function range(from, to) {
  // your code here
  let current = from;
  return {
    [Symbol.iterator]: () => {
      return {
        next() {
          if (current <= to) {
            return { done: false, value: current++ };
          } else {
            return { done: true };
          }
        },
      };
    },
  };
}
