/**
 * @param {string} str
 * @return {boolean}
 */
function validate(str) {
  // your code here
  const bracketMap = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (bracketMap[str[i]]) {
      stack.push(str[i]);
    } else {
      if (bracketMap[stack.pop()] !== str[i]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
