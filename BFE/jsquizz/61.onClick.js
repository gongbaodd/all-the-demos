// This is a JavaScript Quiz from BFE.dev

console.log(1);

document.body.addEventListener("click", () => {
  console.log(2);
});

Promise.resolve().then(() => {
  console.log(3);
});

setTimeout(() => {
  console.log(4);
}, 0);

console.log(5);

document.body.click();

console.log(6);

/*
1
5
2
6
3
4
*/
