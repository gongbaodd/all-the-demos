/**
 * @param {any} data
 * @return {string}
 */
function detectType(data) {
  // your code here
  return Object.prototype.toString
    .call(data)
    .replace(/\[object (.*)\]/, "$1")
    .toLowerCase();
}
