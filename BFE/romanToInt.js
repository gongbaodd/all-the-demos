const MAP = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};
/**
 * @param {string} str - roman numeral string
 * @returns {number} integer
 */
function romanToInteger(str) {
  // your code here
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    if (MAP[str[i]] < MAP[str[i + 1]]) {
      result -= MAP[str[i]];
    } else {
      result += MAP[str[i]];
    }
  }
  return result;
}
