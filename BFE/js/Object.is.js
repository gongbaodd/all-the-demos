/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function is(a, b) {
  // your code here
  if (a !== a) {
    // only NaN satisfies this condition
    return b !== b;
  }

  if (a === 0 && b === 0) {
    // 0 and -0 are different, use Infinity to check
    return 1 / a === 1 / b;
  }

  return a === b;
}

console.log(is(-0, -0));
console.log(-0 === -0);
