/**
 * @param {string} str
 * @return {string}
 */
function compress(str) {
  // your code here
  let res = "";
  let count = 1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      res += str[i] + (count === 1 ? "" : count);
      count = 1;
    }
  }
  return res;
}
