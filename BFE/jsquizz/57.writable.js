const a = {};
Object.defineProperty(a, "foo1", {
  value: 1,
});
const b = Object.create(a);
b.foo2 = 1;

console.log(b.foo1);
console.log(b.foo2);

b.foo1 = 2;
b.foo2 = 2;

console.log(b.foo1); // still 1
console.log(b.foo2);

// Its just how inheritance in javascript works. Any new properties defined on inherited object can be controlled when defining. But, If a non-writable value property is inherited, it still prevents modifying the property on the object. In fact, in strict mode, it'll throw an error when trying to reassign a new value to b.foo1
