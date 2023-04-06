const roman = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

/**
 * @param {number} integer
 * @returns {string} str - roman numeral string
 */
function integerToRoman(num) {
  // your code here
  if (num === 0) return "";

  if (num > 0) {
    for (let key in roman) {
      if (num >= roman[key]) {
        return key + integerToRoman(num - roman[key]);
      }
    }
  }
}
console.log(integerToRoman(123)); // 'CXXIII'

console.log(integerToRoman(1999)); // 'MCMXCIX'

console.log(integerToRoman(3420)); // 'MMMCDXX'
