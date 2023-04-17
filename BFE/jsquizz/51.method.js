// case 1
const obj1 = {
  foo() {
    console.log(super.foo());
  },
};

/* 
  
  `obj1` is normal instance of `Object` and it doesn't have `prototype`, only
  constructor function can have `prototype` property. Instance can only has `__proto__`
  property which point to object pointed by `prototype` property of its constructor 
  funciton.
  
  Here. we are making `__proto__` property of `obj1` to a different object.
  
  */

Object.setPrototypeOf(obj1, {
  foo() {
    return "bar";
  },
});

/* 
  `foo` method of `obj1` is invoked which invokes `foo` method of object pointed by
  `__proto__` which result into printing `bar`
  */

obj1.foo(); // 'bar'

// case 2

const obj2 = {
  foo: function () {
    /* This will throw error because `super` can only be used in methods.
        What is method? It is a function which has [[HomeObject]] internal 
        property pointing to the object to which the method belongs.
        
      Any reference to super uses the [[HomeObject]] to determine what to do. 
      The first step in the process is to call Object.getPrototypeOf() on the 
      [[HomeObject]] to retrieve a reference to the prototype. Next, 
      the prototype is searched for a function with the same name. 
      Then, the this binding is set and the method is called.
  
  
      [[HomeObject]] property is created only when method is created using 
      ES2015 method styld. Since here normal style is used to declare `foo`,
      it doesn't have [[HomeObject]], thus it will give error
        */
    console.log(super.foo()); // error
  },
};

Object.setPrototypeOf(obj2, {
  foo() {
    return "bar";
  },
});

obj2.foo();

// Ans: Error. It will throw error during `excution creation phase` itself
