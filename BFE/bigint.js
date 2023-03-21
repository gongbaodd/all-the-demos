/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function add(num1, num2) {
  // your code here
  let arr1 = num1.split("");
  let arr2 = num2.split("");
  let carry = 0;

  let result = [];

  while (arr1.length || arr2.length || carry) {
    let sum = carry;
    if (arr1.length) {
      sum += parseInt(arr1.pop());
    }
    if (arr2.length) {
      sum += parseInt(arr2.pop());
    }
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
  }

  return result.reverse().join("");
}
