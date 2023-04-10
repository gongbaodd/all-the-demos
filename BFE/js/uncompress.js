/**
 * @param {string} str
 * @returns {string}
 */
function uncompress(str) {
  // your code here
  const stack = [];
  let result = "";
  let nums = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === "(") {
      stack.push(result);
      result = "";
      continue;
    }
    if (char === ")") {
      const prev = stack.pop();
      const num = nums.pop();
      result = prev + result.repeat(num);
      continue;
    }
    if (Number.isInteger(+char)) {
      let num = nums.pop() || 0;
      if (Number.isInteger(+str[i - 1])) {
        num = num * 10;
      } else {
        nums.push(num);
        num = 0;
      }
      num += +char;
      nums.push(num);
      continue;
    }
    result += char;
  }
  return result;
}

// const a = uncompress("3(ab)"); // 'ababab'
// console.log(a);
const b = uncompress("1(BFE11(dev))"); // 'abccabccabcc'
console.log(b);
