/**
 * @param {number[]} arr1 - sorted integer array
 * @param {number[]} arr2 - sorted integer array
 * @returns {number}
 */
function median(arr1, arr2) {
  // your code here
  let arr = arr1.concat(arr2);
  arr.sort(function (a, b) {
    return a - b;
  });
  let len = arr.length;
  if (len % 2 == 0) {
    return (arr[len / 2 - 1] + arr[len / 2]) / 2;
  } else {
    return arr[(len - 1) / 2];
  }
}
