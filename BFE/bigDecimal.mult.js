/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function multiply(a, b) {
  // your code here
  //   1. get the sign
  //   2. move the points to the end of the string, if there is no point, add a point at the end
  //   3. add zeros to the shorter string
  //   4. split the second string into digits and multiply the first string with each digit
  //   5. sum up the results
  //   6. move the point to the right position

  if (a === "0" || b === "0") return "0";

  const { sign1, sign2, sign } = handleSign(a, b);
  const { abs1, abs2 } = removeSign(a, b);
  let { arr1, arr2, time10s } = removePoint(abs1, abs2);
  const digitResults = multiplyDigits(arr1, arr2);
  const sumup = sum(digitResults);
  const absresult = movePoint(sumup, time10s + time10s);

  if (absresult === "0") return "0";

  return sign === -1 ? "-" + absresult : absresult;

  function handleSign(a, b) {
    const sign1 = a[0] === "-" ? -1 : 1;
    const sign2 = b[0] === "-" ? -1 : 1;
    const sign = sign1 * sign2;
    return { sign1, sign2, sign };
  }

  function removeSign(a, b) {
    if (isNaN(a[0])) a = a.slice(1);
    if (isNaN(b[0])) b = b.slice(1);
    return { abs1: a, abs2: b };
  }

  function removePoint(a, b) {
    a = a.split("");
    b = b.split("");
    if (!a.includes(".")) a.push(".");
    if (!b.includes(".")) b.push(".");

    let point1 = a.indexOf(".");
    let point2 = b.indexOf(".");
    let time10s = 0;

    while (point1 !== a.length - 1 || point2 !== b.length - 1) {
      if (point1 === a.length - 1) {
        a.push("0");
      }

      if (point2 === b.length - 1) {
        b.push("0");
      }

      [a[point1], a[point1 + 1]] = [a[point1 + 1], a[point1]];
      [b[point2], b[point2 + 1]] = [b[point2 + 1], b[point2]];

      point1++;
      point2++;
      time10s++;
    }

    const arr1 = a.slice(0, a.length - 1).map((digit) => Number(digit));
    const arr2 = b.slice(0, b.length - 1).map((digit) => Number(digit));

    return { arr1, arr2, time10s };
  }

  function multiplyDigits(a, b) {
    const digitResults = [];
    for (let i = b.length - 1; i >= 0; i--) {
      const digit = b[i];
      const result = multiplyByOne(a, digit);

      let time10 = b.length - 1 - i;

      while (time10) {
        result.push(0);
        time10--;
      }

      digitResults.push(result);
    }

    return digitResults;
  }

  function multiplyByOne(a, b) {
    const result = [];
    let carry = 0;

    for (let i = a.length - 1; i >= 0; i--) {
      const digit = a[i];
      const product = digit * b;
      const sum = product + carry;
      const remainder = sum % 10;
      carry = Math.floor(sum / 10);
      result.unshift(remainder);
    }

    if (carry) result.unshift(carry);

    return result;
  }

  function sum(digitResults) {
    let result = digitResults[0];

    for (let i = 1; i < digitResults.length; i++) {
      const digitResult = digitResults[i];
      result = add(result, digitResult);
    }

    return result;
  }

  function add(a, b) {
    const result = [];
    let carry = 0;

    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const digit1 = a[a.length - 1 - i] || 0;
      const digit2 = b[b.length - 1 - i] || 0;
      const sum = digit1 + digit2 + carry;
      const remainder = sum % 10;
      carry = Math.floor(sum / 10);
      result.unshift(remainder);
    }

    if (carry) result.unshift(carry);
    return result;
  }

  function movePoint(a, time10s) {
    let point = a.length - time10s;

    if (point === a.length) return a.join("");

    if (point > 0) {
      a.splice(point, 0, ".");
    } else {
      while (point < 0) {
        a.unshift(0);
        point++;
      }
      a.unshift("0.");
    }

    while (a[a.length - 1] === 0) {
      a.pop();
    }

    return a.join("");
  }
}

console.log(multiply("-1123456787654323456789", "1234567887654323456.12348"));
