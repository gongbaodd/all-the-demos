/**
 * @param {number[]} arr
 * @returns number
 */
function findSingle(arr) {
  // your code here
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result ^= arr[i];
  }
  return result;
}

const arr = [10, 2, 2, 1, 0, 0, 10];
console.log(findSingle(arr)); // 1
