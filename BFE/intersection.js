/**
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @returns {any[]}
 */
function getIntersection(arr1, arr2) {
  // your code here
  const result = new Set();
  for (const i of arr1) {
    if (arr2.includes(i)) result.add(i);
  }

  return [...result];
}
