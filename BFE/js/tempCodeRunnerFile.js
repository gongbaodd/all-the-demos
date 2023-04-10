// This is a JavaScript coding problem from BFE.dev

/**
 * @param {number} num
 * @returns {number}
 */
function clz32(num) {
  // your code here
  let [str] = num.toString(2).split(".");
  if (str === "0") return 32;
  return 32 - str.length;
}

console.log(clz32(1));
console.log(clz32(10000)); // 18
console.log(clz32(25.45)); // 27
