/**
 * @param {string} str
 * @return {string}
 */
function smallestUniqueSubstr(str) {
  // your code here
  const stack = [];
  const visited = new Set();
  const occurences = new Map();
  for (let i = 0; i < str.length; i++) {
    occurences.set(str[i], i);
  }
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (visited.has(char)) continue;

    while (
      stack.length &&
      char < stack[stack.length - 1] &&
      occurences.get(stack[stack.length - 1]) > i
    ) {
      visited.delete(stack.pop());
    }

    visited.add(char);
    stack.push(char);
  }

  return stack.join("");
}

console.log(smallestUniqueSubstr("xyzabcxyzabc")); // "abcxyz
