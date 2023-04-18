// This is a JavaScript Quiz from BFE.dev

console.log(1 + 1); // 2
console.log(1 + +1); // 2
console.log(1 + +1 + 1); // 3
console.log(1 + +1 + +1); // 3
console.log(1 + +(+1)); // 2

console.log(1 + +"1" + +"1"); // 3
console.log("1" + +"1" + +"1"); // 111
console.log("a" + +"b"); // aNaN
console.log("a" + +"b" + "c"); // aNaNc
console.log("a" + +"b" + +"c"); // aNaNNaN

/**
2
2
3
3
2
3
111
aNaN
aNaNc
aNaNNaN
 */
