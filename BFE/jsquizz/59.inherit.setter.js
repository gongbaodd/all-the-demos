// This is a JavaScript Quiz from BFE.dev

class A {
  val = 1;
  get foo() {
    return this.val;
  }
}

class B {
  val = 2;
  set foo(val) {
    this.val = val;
  }
}
const a = new A();
const b = new B();
console.log(a.foo); // 1
console.log(b.foo); // undefined
b.foo = 3;
console.log(b.val); // 3
console.log(b.foo); // undefined
