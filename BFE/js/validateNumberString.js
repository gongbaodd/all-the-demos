/**
 * @param {string} str
 * @returns {boolean}
 */
function validateNumberString(str) {
  // your code here
  if (str !== 0 && !str) {
    return false;
  }

  return Number(str).toString() !== "NaN";
}
