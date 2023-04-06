/**
 * interface Matcher {
 *  toBe(data: any): void
 * }
 */
/**
 * @param {any} input
 * @returns {Matcher & {not: Matcher}}
 */
function myExpect(input) {
  // your code here
  let not = false;
  return {
    toBe: function (data) {
      const equal = Object.is(input, data);
      if (not ? equal : !equal) {
        throw new Error(`${input} is not equal to ${data}`);
      }
    },
    get not() {
      not = !not;
      return this;
    },
  };
}
