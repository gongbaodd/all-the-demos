/**
 * @param {number[]} arr - ascending unique array
 * @param {number} target
 * @return {number}
 */
function binarySearch(arr, target) {
  // your code here
  let mid = Math.floor(arr.length / 2);

  if (arr[mid] === target) {
    return mid;
  }

  if (arr[mid] > target) {
    return binarySearch(arr.slice(0, mid), target);
  }

  if (arr[mid] < target) {
    return binarySearch(arr.slice(mid + 1), target);
  }

  return -1;
}
