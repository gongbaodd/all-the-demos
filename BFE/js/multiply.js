/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function multiply(a, b) {
  if (a === "0" || b === "0") return "0";
  const signa = a[0] === "-" ? -1 : 1;
  const signb = b[0] === "-" ? -1 : 1;
  const sign = signa !== signb ? "-" : "";
  a = isNaN(a[0]) ? a.slice(1) : a;
  b = isNaN(b[0]) ? b.slice(1) : b;

  const results = new Array(a.length + b.length).fill(0);

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      const product = a[i] * b[j];
      const sum = product + results[i + j + 1];
      results[i + j] += Math.floor(sum / 10);
      results[i + j + 1] = sum % 10;
    }
  }

  while (results[0] === 0) {
    results.shift();
  }

  return sign + results.join("");
}

console.log(multiply("12", "11"));
// results = [[2, 1], [0, 2, 1]]
