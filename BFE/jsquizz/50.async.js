async function async1() {
  console.log(1); // 2️⃣
  await async2();
  console.log(2); // 6️⃣
}

async function async2() {
  console.log(3); //  3️⃣
}

console.log(4); // 1️⃣

setTimeout(function () {
  console.log(5); // 8️⃣
}, 0);

async1();

new Promise(function (resolve) {
  console.log(6); // 4️⃣
  resolve();
}).then(function () {
  console.log(7); // 7️⃣
});

console.log(8); // 5️⃣

// 4
// 1
// 3
// 6
// 8
// 2
// 7
// 5
