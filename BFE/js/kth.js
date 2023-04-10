/**
 * @param {number[]} arr
 * @param {number} k
 */
function findKThLargest(arr, k) {
  // your code here
  qsort(arr);
  return arr[arr.length - k];
}

function qsort(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const p = partition(arr, lo, hi);
    qsort(arr, lo, p);
    qsort(arr, p + 1, hi);
  }
}

function partition(arr, lo, hi) {
  let l = lo - 1;
  let r = hi + 1;
  const pivot = arr[lo];

  while (true) {
    do {
      l++;
    } while (arr[l] < pivot);

    do {
      r--;
    } while (arr[r] > pivot);

    if (l >= r) {
      return r;
    }

    [arr[l], arr[r]] = [arr[r], arr[l]];
  }
}
