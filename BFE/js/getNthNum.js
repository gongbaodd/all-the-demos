/**
 * @param {number} n - integer
 * @returns {string}
 */
function getNthNum(n) {
  // your code here
  if (n === 1) return "1";
  if (n === 2) return "11";
  if (n === 3) return "21";
  if (n === 4) return "1211";
  if (n === 5) return "111221";
  if (n === 6) return "312211";
  //   if (n === 7) return "13112221";

  let pre = getNthNum(n - 1);
  let count = 1;
  let res = "";
  for (let i = 0; i < pre.length; i++) {
    if (pre[i] === pre[i + 1]) {
      count++;
    } else {
      res += count + pre[i];
      count = 1;
    }
  }
  return res;
}

console.log(getNthNum(7)); // 1
