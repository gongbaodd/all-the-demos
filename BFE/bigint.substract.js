/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function subtract(num1, num2) {
  // your code here
  const num1Arr = num1.split("").reverse();
  const num2Arr = num2.split("").reverse();
  const result = [];
  let carry = 0;
  for (let i = 0; i < num1Arr.length; i++) {
    let sub = parseInt(num1Arr[i]) - parseInt(num2Arr[i]) - carry;
    if (sub < 0) {
      sub += 10;
      carry = 1;
    } else {
      carry = 0;
    }
    result.push(sub);
  }

  while (
    (result[result.length - 1] === 0 && result.length > 1) ||
    (isNaN(result[result.length - 1]) && result.length > 1)
  ) {
    // remove leading zeros
    result.pop();
  }

  return result.reverse().join("");
}
