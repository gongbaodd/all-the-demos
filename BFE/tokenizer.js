/**
 * @param {string} str
 * @return {Generator}
 */
function* tokenize(str) {
  // your code here
  let buffer = "";
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === " ") {
      continue;
    }
    if ([..."+-*/()"].includes(char)) {
      if (buffer) {
        yield buffer;
        buffer = "";
      }
      yield char;
    } else {
      buffer += char;
    }
  }

  if (buffer) {
    yield buffer;
  }
}
