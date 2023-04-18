console.log(Function instanceof Object); // true
// Object.getPrototypeOf(Function) is not equal to Object.prototype
// it goes further in chain
// Object.getPrototypeOf(Object.getPrototypeOf((Function)) is equal to Object.prototype

console.log(Object instanceof Function); // true
// Object.getPrototypeOf(Object) is equal to Function.prototype
