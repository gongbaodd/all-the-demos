/**
 * @param {string} str
 * @return {number}
 */
function countPalindromicSubstr(str) {
  // your code here
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    for (let j = i; j < str.length; j++) {
      if (isPalindrome(str, i, j)) {
        count++;
      }
    }
  }
  return count;

  function isPalindrome(str, i, j) {
    while (i < j) {
      if (str[i] !== str[j]) return false;
      i++;
      j--;
    }
    return true;
  }
}
