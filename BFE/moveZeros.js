// This is a JavaScript coding problem from BFE.dev

/**
 * @param {Array<any>} list
 * @returns {void}
 */
function moveZeros(list) {
  // your code here
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === 0) {
      list.splice(i, 1);
      i--;
      count++;
    }
  }
  while (count > 0) {
    list.push(0);
    count--;
  }
}

const input = [0, 0, 0, 1, 3, 2, 6];
moveZeros(input);
console.log(input);
