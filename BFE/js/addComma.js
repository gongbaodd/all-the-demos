/**
 * @param {number} num
 * @return {string}
 */
function addComma(num) {
  // your code here
  let parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
