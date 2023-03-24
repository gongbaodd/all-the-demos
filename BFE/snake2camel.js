/**
 * @param {string} str
 * @return {string}
 */
function snakeToCamel(str) {
  // your code here
  const result = [];

  let i = 0;

  for (; i < str.length; i++) {
    // handle preffix
    const char = str[i];
    if (char === "_") {
      result.push(char);
    } else {
      break;
    }
  }

  for (; i < str.length; i++) {
    const char = str[i];
    if (char === "_") {
      const nextChar = str[i + 1];

      if (nextChar) {
        if (nextChar === "_") {
          result.push(char);
        }
        result.push(nextChar.toUpperCase());
        i++;
      }
    } else {
      result.push(char);
    }
  }

  for (let i = str.length - 1; i > 0; i--) {
    // handle suffix
    const char = str[i];
    if (char === "_") {
      result.push(char);
    } else {
      break;
    }
  }

  return result.join("");
}
