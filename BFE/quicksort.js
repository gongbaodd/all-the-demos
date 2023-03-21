/**
 * @param {number[]} arr
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
  // your code here
  if (arr.length < 2) {
    return arr;
  }

  if (left < right) {
    const pivot = partition(arr, left, right);
    quickSort(arr, left, pivot);
    quickSort(arr, pivot + 1, right);
  }

  function partition(arr, l, r) {
    const p = Math.floor((l + r) / 2);
    const pivot = arr[p];

    let i = l - 1;
    let j = r + 1;

    while (true) {
      do {
        i++;
      } while (arr[i] < pivot);

      do {
        j--;
      } while (arr[j] > pivot);

      if (i >= j) {
        return j;
      }
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}
