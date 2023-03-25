.// const memo = {
//   0: 0,
//   1: 1,
// };
// /**
//  * @param {number} n - non-negative integer
//  * @return {number}
//  */
// function fib(n) {
//   // your code here
//   if (memo[n] !== undefined) {
//     return memo[n];
//   }

//   return (memo[n] = fib(n - 1) + fib(n - 2));
// }

/**
 * @param {number} n - non-negative integer
 * @return {number}
 */
function fib(n, n1 = 0, n2 = 1) {
  // your code here

  if (n === 0) {
    return n1;
  }

  return fib(n - 1, n2, n1 + n2);
}

console.log(fib(10));
