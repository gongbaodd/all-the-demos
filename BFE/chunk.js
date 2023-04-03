/**
 * @param {any[]} items
 * @param {number} size
 * @returns {any[][]}
 */
function chunk(items, size) {
  // your code here

  if (size <= 0) {
    return [];
  }

  let result = [];
  let temp = [];
  for (let i = 0; i < items.length; i++) {
    temp.push(items[i]);
    if (temp.length === size) {
      result.push(temp);
      temp = [];
    }
  }
  if (temp.length > 0) {
    result.push(temp);
  }
  return result;
}
