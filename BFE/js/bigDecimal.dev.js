/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function divide(a, b) {
  // your code here
  // 1. get the sign
  // 2. move the points to the end of the string, and remove the point
  // 3. add zeros to the shorter string, untill they have the same length, remember the times of adding `times10s`
  // 4. a substract b multiple times, and count the times and remainder, push the times to the result array
  // 5. reminder * 10 substract b, to get the second digit(push into result array), repeat step 4-5, repeat stops when the remainder is 0 or the result array length + times10s > 20
  // 6. move the point to the right position

  if (a === "0") return "0";
  if (b === "0") throw new Error("Division by zero");

  const { sign } = handleSign(a, b);
  const { abs1, abs2 } = removeSign(a, b);
  let { arr: arrA, time10s: dev10s } = removePoint(abs1);
  let { arr: arrB, time10s } = removePoint(abs2);
  const { count1, count2, arr1, arr2 } = align(arrA, arrB);

  dev10s += count1;
  time10s += count2;
  time10s = time10s - dev10s;

  const resultArray = div(arr1, arr2, time10s);
  time10s = resultArray.length - 1 - time10s;
  if (time10s < -20) {
    return "0";
  }

  const absResult = addPoint(resultArray, time10s);

  if (absResult === "0") return "0";

  return sign === -1 ? "-" + absResult : absResult;

  function handleSign(arr1, arr2) {
    const a = [...arr1];
    const b = [...arr2];

    const sign1 = a[0] === "-" ? -1 : 1;
    const sign2 = b[0] === "-" ? -1 : 1;
    const sign = sign1 * sign2;
    return { sign1, sign2, sign };
  }

  function removeSign(arr1, arr2) {
    let a = [...arr1];
    let b = [...arr2];
    if (isNaN(a[0])) a = a.slice(1);
    if (isNaN(b[0])) b = b.slice(1);
    return { abs1: a, abs2: b };
  }

  function removePoint(arr) {
    const a = [...arr];
    if (!a.includes(".")) a.push(".");

    let point = a.indexOf(".");
    let time10s = 0;

    while (point !== a.length - 1) {
      [a[point], a[point + 1]] = [a[point + 1], a[point]];
      point++;
      time10s++;
    }

    a.pop();

    while (a[0] === "0") a.shift();

    return { arr: a.map(Number), time10s: time10s };
  }

  function align(a, b) {
    const arr1 = [...a];
    const arr2 = [...b];

    let count1 = 0;
    while (arr1.length < arr2.length) {
      arr1.push(0);
      count1++;
    }

    let count2 = 0;
    while (arr2.length < arr1.length) {
      arr2.push(0);
      count2++;
    }

    return { count1, count2, arr1, arr2 };
  }

  function isGreater(arr1, arr2) {
    if (arr1.length > arr2.length) return true;
    if (arr1.length < arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] > arr2[i]) return true;
      if (arr1[i] < arr2[i]) return false;
    }
    return true;
  }

  function sub(a, b) {
    // arr1.length >= arr2.length
    const arr1 = [...a];
    const arr2 = [...b];

    while (arr2.length < arr1.length) arr2.unshift(0);

    const result = [];
    let carry = 0;
    for (let i = arr1.length - 1; i >= 0; i--) {
      let temp = arr1[i] - arr2[i] - carry;
      if (temp < 0) {
        temp += 10;
        carry = 1;
      } else {
        carry = 0;
      }
      result.unshift(temp);
    }

    while (result[0] === 0) result.shift();

    return result;
  }

  function div(a, b, time10s) {
    const result = [];
    let minuend = [...a];
    const subtrahend = [...b];
    let subcount = 0;

    while (result.length - 1 - time10s < 20) {
      while (isGreater(minuend, subtrahend)) {
        minuend = sub(minuend, subtrahend);
        subcount++;
      }

      minuend.push(0);
      result.push(subcount);
      subcount = 0;

      if (minuend.length === 1 && minuend[0] === 0) break;
    }

    if (result.length === 0) result.push(0);

    return result;
  }

  function addPoint(array, time10s) {
    const arr = [...array];

    if (time10s === 0) return arr.join("");

    while (time10s < 0) {
      arr.push(0);
      time10s++;
    }

    while (arr.length < time10s) {
      arr.unshift(0);
    }

    arr.splice(arr.length - time10s, 0, ".");

    while (arr[0] === 0) arr.shift();

    if (arr[0] === ".") arr.unshift(0);

    while (arr[arr.length - 1] === 0) arr.pop();
    if (arr[arr.length - 1] === ".") arr.pop();

    return arr.join("");
  }
}
