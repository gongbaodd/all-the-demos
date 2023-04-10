const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let count = 0;
/**
 * @returns {string}
 */
function getUniqueClassName() {
  // your code here
  let classname = "";
  let index = count++;
  while (index >= 0) {
    classname = alphabet[index % alphabet.length] + classname;
    index = Math.floor(index / alphabet.length) - 1;
  }
  return classname;
}

getUniqueClassName.reset = function () {
  // your code here
  count = 0;
};

console.log(getUniqueClassName()); // 'a'
