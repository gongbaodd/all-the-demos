/**
 * @param {string} str
 * @returns {string | string[]}
 */

function count(str) {
  // your code here
  const map = new Map();
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
  }

  const max = Math.max(...map.values());
  const result = [];
  for (const [key, value] of map.entries()) {
    if (value === max) {
      result.push(key);
    }
  }

  if (result.length === 1) {
    return result[0];
  }

  return result;
}
