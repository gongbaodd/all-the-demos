/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function subtract(num1, num2) {
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

  // if num1 is positive and num2 is negative
  if (!isNegative1 && isNegative2) {
    const result =
      num1Arr.length > num2Arr.length
        ? absAdd(num1Arr, num2Arr)
        : absAdd(num2Arr, num1Arr);
    return result.reverse().join("");
  } else if (isNegative1 && !isNegative2) {
    // if num1 is negative and num2 is positive
    const result =
      num1Arr.length > num2Arr.length
        ? absAdd(num1Arr, num2Arr)
        : absAdd(num2Arr, num1Arr);
    result.push("-");
    return result.reverse().join("");
  } else if (isNegative1 && isNegative2) {
    // if both are negative
    if (absCmp(num1Arr, num2Arr) === 0) {
      // num1 === num2
      return "0";
    } else if (absCmp(num1Arr, num2Arr) === 1) {
      // num1 > num2
      const result = absSub(num1Arr, num2Arr);
      result.push("-");
      return result.reverse().join("");
    } else {
      // num1 < num2
      const result = absSub(num2Arr, num1Arr);
      return result.reverse().join("");
    }
  } else {
    // if both are positive
    if (absCmp(num1Arr, num2Arr) === 0) {
      // num1 === num2
      return "0";
    } else if (absCmp(num1Arr, num2Arr) === 1) {
      // num1 > num2
      const result = absSub(num1Arr, num2Arr);
      return result.reverse().join("");
    } else {
      // num1 < num2
      const result = absSub(num2Arr, num1Arr);
      result.push("-");
      return result.reverse().join("");
    }
  }

  function absCmp(num1Arr, num2Arr) {
    if (num1Arr.length > num2Arr.length) {
      return 1;
    } else if (num1Arr.length < num2Arr.length) {
      return -1;
    } else {
      for (let i = num1Arr.length - 1; i >= 0; i--) {
        if (num1Arr[i] > num2Arr[i]) {
          return 1;
        } else if (num1Arr[i] < num2Arr[i]) {
          return -1;
        }
      }
      return 0;
    }
  }

  function absAdd(num1Arr, num2Arr) {
    const result = [];
    let carry = 0;
    for (let i = 0; i < num1Arr.length; i++) {
      const sum = Number(num1Arr[i]) + Number(num2Arr[i] || 0) + carry;
      result.push(sum % 10);
      carry = Math.floor(sum / 10);
    }
    if (carry) {
      result.push(carry);
    }
    return result;
  }

  function absSub(num1Arr, num2Arr) {
    const result = [];
    let carry = 0;
    for (let i = 0; i < num1Arr.length; i++) {
      const diff = Number(num1Arr[i]) - Number(num2Arr[i] || 0) - carry;
      if (diff < 0) {
        result.push(diff + 10);
        carry = 1;
      } else {
        result.push(diff);
        carry = 0;
      }
    }

    // remove leading zeros
    while (result[result.length - 1] === 0) {
      result.pop();
    }
    return result;
  }
}
