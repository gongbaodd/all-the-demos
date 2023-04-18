// This is a JavaScript Quiz from BFE.dev

let val = 0;

class A {
  set foo(_val) {
    val = _val;
  }
  get foo() {
    return val;
  }
}

class B extends A {}

class C extends A {
  get foo() {
    return val;
  }
  //  Apparently, when we override the get method, it appears that the set method must also be overridden, otherwise undefined is returned
  // https://stackoverflow.com/questions/28950760/override-a-setter-and-the-getter-must-also-be-overridden
}

const b = new B();
console.log(b.foo); // 0
b.foo = 1;
console.log(b.foo); // 1

const c = new C();
console.log(c.foo); // 1
c.foo = 2;
console.log(c.foo); // 1
console.log(b.foo); // 1
