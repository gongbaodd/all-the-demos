/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function add(num1, num2) {
  // your code here
  const num1Arr = num1.split("").reverse();
  const num2Arr = num2.split("").reverse();
  const isNegative1 = num1Arr[num1Arr.length - 1] === "-";
  const isNegative2 = num2Arr[num2Arr.length - 1] === "-";

  // omit the sign
  if (
    num1Arr[num1Arr.length - 1] === "-" ||
    num1Arr[num1Arr.length - 1] === "+"
  ) {
    num1Arr.pop();
  }

  if (
    num2Arr[num2Arr.length - 1] === "-" ||
    num2Arr[num2Arr.length - 1] === "+"
  ) {
    num2Arr.pop();
  }

  // if both are negative
  if (isNegative1 && isNegative2) {
    const result =
      num1Arr.length > num2Arr.length
        ? absAdd(num1Arr, num2Arr)
        : absAdd(num2Arr, num1Arr);
    result.push("-");
    return result.reverse().join("");
  }

  // if both are positive
  if (!isNegative1 && !isNegative2) {
    const result =
      num1Arr.length > num2Arr.length
        ? absAdd(num1Arr, num2Arr)
        : absAdd(num2Arr, num1Arr);
    return result.reverse().join("");
  }

  if (absCmp(num1Arr, num2Arr) === 0) {
    // num1 === num2
    return "0";
  } else if (absCmp(num1Arr, num2Arr) === 1) {
    // num1 > num2
    const result = absSub(num1Arr, num2Arr);
    if (isNegative1) {
      result.push("-");
    }
    return result.reverse().join("");
  } else {
    // num1 < num2
    const result = absSub(num2Arr, num1Arr);
    if (isNegative2) {
      result.push("-");
    }
    return result.reverse().join("");
  }

  function absCmp(num1, num2) {
    if (num1.length > num2.length) {
      return 1;
    }
    if (num1.length < num2.length) {
      return -1;
    }
    for (let i = num1.length - 1; i >= 0; i--) {
      if (num1[i] > num2[i]) {
        return 1;
      }
      if (num1[i] < num2[i]) {
        return -1;
      }
    }
    return 0;
  }

  function absAdd(num1, num2) {
    const result = [];
    let carry = 0;
    for (let i = 0; i < num1.length; i++) {
      let sum = parseInt(num1[i]) + parseInt(num2[i] ?? 0) + carry;
      if (sum >= 10) {
        sum -= 10;
        carry = 1;
      } else {
        carry = 0;
      }
      result.push(sum);
    }

    if (carry === 1) {
      result.push(1);
    }

    return result;
  }

  function absSub(num1, num2) {
    const result = [];
    let carry = 0;
    for (let i = 0; i < num1.length; i++) {
      let sub = parseInt(num1[i]) - parseInt(num2[i] ?? 0) - carry;
      if (sub < 0) {
        sub += 10;
        carry = 1;
      } else {
        carry = 0;
      }
      result.push(sub);
    }

    // remove the leading zeros
    while (
      (result[result.length - 1] === 0 && result.length > 1) ||
      (isNaN(result[result.length - 1]) && result.length > 1)
    ) {
      result.pop();
    }

    return result;
  }
}

console.log(add("1000000000000000000", "-1"));
