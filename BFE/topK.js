/*
 * @param {number[]} arr
 * @param {number} k
 * @returns {number[]}
 */
function topK(arr, k) {
  // your code here

  const result = quickSort(arr).reverse().slice(0, k);

  return result;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (arr.length < 2) {
    return arr;
  }

  if (left < right) {
    const pivot = partition(arr, left, right);
    quickSort(arr, left, pivot);
    quickSort(arr, pivot + 1, right);
  }

  return arr;
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

console.log(topK([1, 3, 2, 3], 1)); //.toEqual([3]);
