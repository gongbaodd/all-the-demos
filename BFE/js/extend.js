const myExtends = (SuperType, SubType) => {
  // your code here
  function ExtendedType(...args) {
    SuperType.call(this, ...args);
    SubType.call(this, ...args);

    // equal to line 14
    Object.setPrototypeOf(this, SubType.prototype);
  }

  // All the instance can use SubType's prototype methods
  // "newInstance's [[Prototype]] to the constructor function's prototype property" - MDN, new operator
  // new extendedType('bfe').__proto__ should be SubType.prototype
  // ExtendedType.prototype = SubType.prototype;

  // new extendedType('bfe').__proto__.__proto__ should be SuperType.prototype
  Object.setPrototypeOf(SubType.prototype, SuperType.prototype);

  // Object.setPrototypeOf(SubType, SuperType);
  // ExtendedType can have SuperType's static methods
  Object.setPrototypeOf(ExtendedType, SuperType);

  return ExtendedType;
};

function SuperType(name) {
  this.name = name;
  this.forSuper = [1, 2];
  this.from = "super";
}
SuperType.prototype.superMethod = function () {};
SuperType.prototype.method = function () {};
SuperType.staticSuper = "staticSuper";

function SubType(name) {
  this.name = name;
  this.forSub = [3, 4];
  this.from = "sub";
}

SubType.prototype.subMethod = function () {};
SubType.prototype.method = function () {};
SubType.staticSub = "staticSub";

const ExtendedType = myExtends(SuperType, SubType);
const instance = new ExtendedType("bfe");

console.log(instance.name); // bfe
console.log(instance.from); // sub
