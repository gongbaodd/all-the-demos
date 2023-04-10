/**
 * @param {string} input
 * @returns string
 */
function removeChars(input) {
  // your code here
  // remove b and ac
  if (input.includes("b") || input.includes("ac")) {
    input = input.replaceAll("b", "");
    input = input.replaceAll("ac", "");
    return removeChars(input);
  } else {
    return input;
  }
}

console.log(removeChars("ab")); // 'a'
