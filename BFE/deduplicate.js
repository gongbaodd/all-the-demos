/**
 * @param {any[]} arr
 */
function deduplicate(arr) {
  // your code here
  const dedupe = [];
  for (let i = 0; i < arr.length; i++) {
    if (!dedupe.includes(arr[i])) {
      dedupe.push(arr[i]);
    } else {
      arr.splice(i, 1);
      i--;
    }
  }
}
const a = [
  1,
  5,
  "b",
  5,
  1,
  undefined,
  "a",
  "a",
  "a",
  "b",
  true,
  "true",
  false,
  {},
  {},
];
deduplicate(a);
console.log(a);
