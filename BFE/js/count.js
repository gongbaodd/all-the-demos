// your code here

let id = 0;

function count() {
  return ++id;
}

count.reset = function () {
  id = 0;
};

const asis = [];
const tobe = [];
for (let i = 1; i <= 100; i++) {
  asis.push(i);
  tobe.push(count());
}

console.log(asis);
