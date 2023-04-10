/**
 * @param {number[]} arr1 - integers
 * @param {number[]} arr2 - integers
 * @returns {number[]}
 */
function intersect(arr1, arr2) {
  // your code here
  const results = [];

  for (let i of arr1) {
    const index = arr2.indexOf(i);

    if (index !== -1) {
      arr2.splice(index, 1);
      results.push(i);
    }
  }

  return results;
}
