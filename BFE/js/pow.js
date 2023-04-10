/**
 * @param {number} base
 * @param {number} power - integer
 * @return {number}
 */
function pow(base, power) {
  // your code here
  if (power === 0) return 1;
  if (power === 1) return base;
  if (power === -1) return 1 / base;
  if (power % 2 === 0) {
    const half = pow(base, power / 2);
    return half * half;
  } else {
    const half = pow(base, (power - 1) / 2);
    return half * half * base;
  }
}
