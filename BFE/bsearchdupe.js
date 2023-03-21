/**
 * @param {number[]} arr - ascending array with duplicates
 * @param {number} target
 * @return {number}
 */
function firstIndex(arr, target) {
  // your code here
  let lo = 0;
  let hi = arr.length - 1;
  let mid = Math.floor((lo + hi) / 2);

  let result = -1;

  if (arr[mid] === target) {
    result = mid;
  }

  if (arr[mid] < target) {
    result = firstIndex(arr.slice(mid + 1), target);
  }

  if (arr[mid] > target) {
    result = firstIndex(arr.slice(0, mid), target);
  }

  while (result !== -1 && arr[result - 1] === target) {
    result--;
  }

  return result;
}
