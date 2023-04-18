// case 1
const obj1 = {
  valueOf() {
    return 1;
  },
  toString() {
    return "100";
  },
};

console.log(obj1 + 1); // 1 + 1 = 2
console.log(parseInt(obj1)); // parseInt("100") = 100

// case 2
const obj2 = {
  [Symbol.toPrimitive]() {
    return 200;
  },

  valueOf() {
    return 1;
  },
  toString() {
    return "100";
  },
};

console.log(obj2 + 1); // 200 + 1 = 201
console.log(parseInt(obj2)); // parseInt(200) = 200

// case 3
const obj3 = {
  toString() {
    return "100";
  },
};

console.log(+obj3); // +"100" = 100
console.log(obj3 + 1); // "100" + "1" = "1001"
console.log(parseInt(obj3)); // parseInt("100") = 100

// case 4
const obj4 = {
  valueOf() {
    return 1;
  },
};

console.log(obj4 + 1); // 1 + 1 = 2
console.log(parseInt(obj4)); // parseInt("[object Object]") = NaN

// case 5
const obj5 = {
  [Symbol.toPrimitive](hint) {
    return hint === "string" ? "100" : 1;
  },
};

console.log(obj5 + 1); // 1 + 1 = 2
console.log(parseInt(obj5)); // parseInt('100') = 100
