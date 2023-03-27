/**
 * @param {string} str
 * @return {string | null}
 */
function firstDuplicate(str) {
  // your code here
  let result = null;
  let set = new Set();
  for (let i = 0; i < str.length; i++) {
    if (set.has(str[i])) {
      result = str[i];
      break;
    } else {
      set.add(str[i]);
    }
  }

  return result;
}
