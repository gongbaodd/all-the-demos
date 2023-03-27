/**
 * @param {number} num - integer
 * @return {number} count of 1 bit
 */
function countOne(num) {
  // your code here
  let count = 0;
  const hex = num.toString(2);
  for (let i = 0; i < hex.length; i++) {
    if (hex[i] === "1") {
      count++;
    }
  }
  return count;
}
