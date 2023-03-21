/**
 * @param {number} num
 */
function sum(num) {
  const add = (n) => sum(num + n);
  add.valueOf = () => num;
  return add;
}
