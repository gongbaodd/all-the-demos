/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function add(num1, num2) {
  // your code here
  // 1. move the points to the end of the string, if there is no point, add a point at the end
  // 2. add zeros to the shorter string
  // 3. add the two strings
  // 4. move the point to the right position
  // 5. remove the zeros at the end of the string
  // 6. add the sign

  const { sign1, sign2 } = handleSign(num1, num2);
  const { abs1, abs2 } = removeSign(num1, num2);
  let { arr1, arr2, time10s } = removePoint(abs1, abs2);
  ({ arr1, arr2 } = align(arr1, arr2));

  const is_add = isAdd(sign1, sign2);
  const is_greater = isGreater(arr1, arr2);
  const sign = getSign({ isAdd: is_add, isGreater: is_greater, sign1, sign2 });

  let intResult = [];
  if (is_add) {
    intResult = add(arr1, arr2);
  } else {
    if (is_greater) {
      intResult = sub(arr1, arr2);
    } else {
      intResult = sub(arr2, arr1);
    }
  }

  let result = movePoint(intResult, time10s).join("");
  if (sign === -1 && result !== "0") result = "-" + result;
  return result;

  function handleSign(num1, num2) {
    const sign1 = num1[0] === "-" ? -1 : 1;
    const sign2 = num2[0] === "-" ? -1 : 1;
    return { sign1, sign2 };
  }

  function removeSign(num1, num2) {
    if (isNaN(num1[0])) num1 = num1.slice(1);
    if (isNaN(num2[0])) num2 = num2.slice(1);
    return { abs1: num1, abs2: num2 };
  }

  function removePoint(num1, num2) {
    num1 = num1.split("");
    num2 = num2.split("");

    if (num1.indexOf(".") === -1) num1.push(".");
    if (num2.indexOf(".") === -1) num2.push(".");

    let point1 = num1.indexOf(".");
    let point2 = num2.indexOf(".");
    let time10s = 0;

    while (point1 < num1.length - 1 || point2 < num2.length - 1) {
      if (point1 === num1.length - 1) num1.push("0");
      if (point2 === num2.length - 1) num2.push("0");

      [num1[point1], num1[point1 + 1]] = [num1[point1 + 1], num1[point1]];
      [num2[point2], num2[point2 + 1]] = [num2[point2 + 1], num2[point2]];

      point1++;
      point2++;
      time10s++;
    }

    return {
      arr1: num1.slice(0, num1.length - 1),
      arr2: num2.slice(0, num2.length - 1),
      time10s,
    };
  }

  function align(arrA, arrB) {
    let arr1 = [...arrA];
    let arr2 = [...arrB];

    const len1 = arr1.length;
    const len2 = arr2.length;
    if (len1 === len2) return { arr1, arr2 };
    const diff = Math.abs(len1 - len2);
    const zeros = new Array(diff).fill("0");
    if (len1 > len2) {
      arr2 = zeros.concat(arr2);
    } else {
      arr1 = zeros.concat(arr1);
    }
    return { arr1, arr2 };
  }

  function isAdd(sign1, sign2) {
    if (sign1 === 1 && sign2 === 1) return true;
    if (sign1 === -1 && sign2 === -1) return true;
    return false;
  }

  function add(arr1, arr2) {
    let carry = 0;
    let result = [];
    for (let i = arr1.length - 1; i >= 0; i--) {
      const a = Number(arr1[i] ?? 0);
      const b = Number(arr2[i] ?? 0);
      let sum = a + b + carry;
      if (sum > 9) {
        carry = 1;
        sum -= 10;
      } else {
        carry = 0;
      }
      result.unshift(sum);
    }
    if (carry === 1) result.unshift(1);
    return result;
  }

  function isGreater(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] > arr2[i]) return true;
      if (arr1[i] < arr2[i]) return false;
    }

    return false;
  }

  function sub(arr1, arr2) {
    let carry = 0;
    let result = [];
    for (let i = arr1.length - 1; i >= 0; i--) {
      const a = Number(arr1[i] ?? 0);
      const b = Number(arr2[i] ?? 0);
      let sub = a - b - carry;
      if (sub < 0) {
        carry = 1;
        sub += 10;
      } else {
        carry = 0;
      }
      result.unshift(sub);
    }
    if (carry === 1) result.unshift(1);

    while (result[0] === 0) {
      result.shift();
    }

    if (result.length === 0) result.push(0);

    return result;
  }

  function movePoint(result, time10s) {
    // ADD zeros in the front
    while (result.length < time10s) {
      result.unshift(0);
    }

    result.push(".");
    for (let i = 0; i < time10s; i++) {
      const p = result.length - 1 - i;
      [result[p], result[p - 1]] = [result[p - 1], result[p]];
    }

    if (result.indexOf(".") === result.length - 1) {
      result.pop();
      return result;
    }

    while (result[result.length - 1] === 0) {
      result.pop();
    }

    if (result[0] === ".") result.unshift("0");
    if (result[result.length - 1] === ".") result.pop();

    return result;
  }

  function getSign(
    opt = { isAdd: false, isGreater: true, sign1: 1, sign2: 1 }
  ) {
    if (opt.isAdd) {
      return opt.sign1 === 1 && opt.sign2 === 1 ? 1 : -1;
    }
    if (opt.isGreater) {
      if (opt.sign1 === 1) return 1;
      else return -1;
    } else {
      if (opt.sign1 === 1) return -1;
      else return 1;
    }
  }
}
console.log(add("0.0011", "-0.009"));
