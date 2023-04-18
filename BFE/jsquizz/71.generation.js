// This is a JavaScript Quiz from BFE.dev

function* gen() {
  yield 2 * (yield 100);
}

const generator = gen();
console.log(generator.next().value); // 100
console.log(generator.next(1).value); // 2
console.log(generator.next(1).value); // undefined
