/**
 * @param {number[][]} arrList
 * non-descending integer array
 * @return {number[]}
 */
function merge(arrList) {
  // your code here
  const result = [];
  const cmparr = []; // length == arrList.length
  const cmpwidth = arrList.length * 2;

  while (arrList.length) {
    for (let i = 0; i < arrList.length; i++) {
      const item = arrList[i].shift();

      if (item === undefined) {
        // remove empty arr
        arrList.splice(i, 1);
        continue;
      }

      cmparr.push(item);
      for (let j = cmparr.length - 1; j > 0; j--) {
        if (cmparr[j] < cmparr[j - 1]) {
          [cmparr[j], cmparr[j - 1]] = [cmparr[j - 1], cmparr[j]];
        }
      }

      if (cmparr.length === cmpwidth) {
        // cmparr is full put the smallest item to result

        let min = cmparr[0];
        const k = 0;
        while (cmparr[k] === min) {
          result.push(cmparr.shift());
        }
      }
    }
  }

  while (cmparr.length) {
    result.push(cmparr.shift());
  }

  return result;
}
