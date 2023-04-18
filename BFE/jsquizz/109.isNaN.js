const a = "BFE.dev";
const b = 1;

// The Number.isNaN() only returns true if the value passed is NaN. Otherwise it returns false.

console.log(Number.isNaN(a)); // false <---
console.log(Number.isNaN(b)); //  false <---
console.log(isNaN(a)); // true <---
console.log(isNaN(b)); // false <---
