/**
 * @param {any} x
 * @return {number}
 */
function mySqrt(x) {
  // your code here
  if (isNaN(x) || x < 0) {
    return NaN;
  }

  if (x === 0) {
    return 0;
  }
  let a = 1;
  let b = x;
  while (a < b) {
    const mid = Math.floor((a + b) / 2);
    if (mid * mid <= x && (mid + 1) * (mid + 1) > x) {
      return mid;
    }
    if (mid * mid > x) {
      b = mid;
    } else {
      a = mid + 1;
    }
  }
  return a;
}
