/**
 * @param {string} str
 * @returns {Number}
 */
function calculate(str) {
  // your code here
  const tokens = tokenize(str);
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === ")") {
      const subStack = [];
      while (stack[stack.length - 1] !== "(") {
        subStack.push(stack.pop());
      }
      stack.pop();
      stack.push(calculateSubStack(subStack.reverse()));
    } else {
      stack.push(tokens[i]);
    }
  }
  return calculateSubStack(stack);

  function calculateSubStack(subStack) {
    if (subStack.length === 1) {
      return subStack[0];
    }

    if (subStack.includes("*") || subStack.includes("/")) {
      for (let i = 0; i < subStack.length; i++) {
        if (subStack[i] === "*") {
          subStack.splice(i - 1, 3, subStack[i - 1] * subStack[i + 1]);
          i--;
        } else if (subStack[i] === "/") {
          subStack.splice(i - 1, 3, subStack[i - 1] / subStack[i + 1]);
          i--;
        }
      }
    }

    let result = subStack[0];
    for (let i = 1; i < subStack.length; i += 2) {
      if (subStack[i] === "+") {
        result += subStack[i + 1];
      } else if (subStack[i] === "-") {
        result -= subStack[i + 1];
      }
    }
    return result;
  }

  function tokenize(str) {
    const tokens = [];
    let number = "";
    for (let i = 0; i < str.length; i++) {
      if (/\d/.test(str[i])) {
        number += str[i];
      } else if ([..."+-*/()"].includes(str[i])) {
        if (number) {
          tokens.push(Number(number));
          number = "";
        }
        tokens.push(str[i]);
      }
    }

    if (number) {
      tokens.push(Number(number));
    }
    return tokens;
  }
}
