/**
 * @param {string} v1
 * @param {string} v2
 * @returns 0 | 1 | -1
 */
function compare(v1, v2) {
  // your code here
  const v1Arr = v1.split(".");
  const v2Arr = v2.split(".");
  const len = Math.max(v1Arr.length, v2Arr.length);
  for (let i = 0; i < len; i++) {
    const v1Num = Number(v1Arr[i]);
    const v2Num = Number(v2Arr[i]);
    if (v1Num > v2Num) {
      return 1;
    } else if (v1Num < v2Num) {
      return -1;
    }
  }
  return 0;
}
compare("12.1.0", "12.0.9");
// 1, meaning first one is greater

compare("12.1.0", "12.1.2");
// -1, meaning latter one is greater

compare("5.0.1", "5.0.1");
// 0, meaning they are equal.
