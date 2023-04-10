// This is a JavaScript coding problem from BFE.dev

/**
 * @param {number} num
 * @returns {number}
 */
function clz32(num) {
  // your code here
  // [Unsigned right shift (>>>)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift)
  num = num >>> 0;
  let [str] = num.toString(2).split(".");
  if (str === "0") return 32;
  return 32 - str.length;
}

const nums = [
  0,
  1,
  2,
  3,
  1.2,
  0.5,
  99,
  100,
  12345,
  9999,
  111112222.3333,
  123456789,
  4294967296,
  4294967295,
  4294967297,
  2147483648,
  2147483649,
  2147483647,
  42949672961234,
  Infinity,
  -Infinity,
  -2,
  -3,
  -12.3467,
  -42949672961234,
];
for (const num of nums) {
  const result = clz32(num);
  if (result !== Math.clz32(num)) {
    throw new Error("failed at " + num);
  }
}
