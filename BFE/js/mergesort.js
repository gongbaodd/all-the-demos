/**
 * @param {number[]} arr
 */
function mergeSort(arr) {
  // your code here
  if (arr.length < 2) {
    return;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  mergeSort(left);
  mergeSort(right);

  let l = 0;
  let r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      arr[l + r] = left[l];
      l++;
    } else {
      arr[l + r] = right[r];
      r++;
    }
  }

  while (l < left.length) {
    arr[l + r] = left[l];
    l++;
  }

  while (r < right.length) {
    arr[l + r] = right[r];
    r++;
  }
}
