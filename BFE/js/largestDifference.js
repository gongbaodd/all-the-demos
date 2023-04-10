/**
 * @param {number[]} arr
 * @return {number}
 */
function largestDiff(arr) {
  // your code here
  let max = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const abs = Math.abs(arr[i] - arr[j]);
      if (max < abs) max = abs;
    }
  }

  return max;
}

console.log(largestDiff([1, 2, 3])); // 2
