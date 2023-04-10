/**
 * @param {number[]} arr
 * @return {number[]}
 */
function findTwo(arr) {
  // your code here
  let set = [];

  for (let i = 0; i < arr.length; i++) {
    const res = set
      .map(([key, item]) => [key, item + arr[i]])
      .filter(([_key, item]) => item === 0);
    if (res.length) {
      return [i, res[0][0]];
    }
    set.push([i, arr[i]]);
  }

  return null;
}
