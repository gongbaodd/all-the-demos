/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function divide(a, b) {
  // your code here

  if (b === "0") {
    throw new Error("Divide by 0");
  }

  if (a === "0") {
    return "0";
  }

  // handle the sign
  let signA = isNaN(a[0]) ? a[0] : "";
  let signB = isNaN(b[0]) ? b[0] : "";
  let sign = signA === signB ? "" : "-";

  // remove the sign
  a = signA ? a.slice(1) : a;
  b = signB ? b.slice(1) : b;

  const zero_result = handleSmaller(a, b);
  if (zero_result) return "0";

  const one_result = handleEqual(a, b);
  if (one_result) return sign + "1";

  return sign + handleGreater(a, b);

  function handleSmaller(a, b) {
    // if a < b, return 0
    if (a.length < b.length) {
      return "0";
    }
    if (a.length === b.length) {
      for (let i = 0; i < a.length; i++) {
        if (a[i] > b[i]) {
          break;
        }
        if (a[i] < b[i]) {
          return "0";
        }
      }
    }
  }

  function handleEqual(a, b) {
    if (a === b) {
      return "1";
    }

    if (a.length === b.length && a[0] === b[0]) {
      return "1";
    }
  }

  function handleGreater(a, b) {
    if (a.length === b.length) {
      return divition(a, b).count;
    }

    let highA = a.slice(0, b.length);
    let lowA = a.slice(b.length);
    let result = [];
    while (lowA.length > 0) {
      let s = divition(highA, b);
      if (s.count !== 0) {
        result.push(s.count);
      }
      highA = s.remainder + lowA[0];

      // add the leading 0
      while (highA.length > b.length) {
        b = "0" + b;
      }

      lowA = lowA.slice(1);
    }

    if (highA.length >= b.length) {
      result.push(divition(highA, b).count);
    }

    return result.join("");
  }

  function sub(a, b) {
    let carry = 0;
    let result = "";
    for (let i = a.length - 1; i >= 0; i--) {
      let temp = Number(a[i]) - Number(b[i]) - carry;
      if (temp < 0) {
        temp += 10;
        carry = 1;
      } else {
        carry = 0;
      }
      result = temp + result;
    }
    return { result, carry };
  }

  function divition(a, b) {
    // same length of a and b
    let count = 0;
    let carry = 0;

    while (carry === 0) {
      let s = sub(a, b);
      carry = s.carry;
      if (carry === 0) {
        a = s.result;
        count++;
      }
    }

    // remove the leading 0
    while (a[0] === "0") {
      a = a.slice(1);
    }

    return { count, remainder: a, carry };
  }
}

console.log(divide("1123456787654323456789", "1234567887654323456"));
