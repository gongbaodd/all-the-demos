/**
 * @param {string} str
 * @return {string}
 */
function longestUniqueSubstr(str) {
  // your code here
  let longest = "";
  let current = "";
  for (let i = 0; i < str.length; i++) {
    if (current.includes(str[i])) {
      if (current.length > longest.length) {
        longest = current;
      }
      current = "";
    }
    current += str[i];
  }
  return longest;
}
