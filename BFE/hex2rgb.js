/**
 * @param {string} hex
 * @return {string}
 */
function hexToRgba(hex) {
  // your code here
  const hexArr = hex.split("");
  const pre = hexArr.shift(); // remove the #

  if (pre !== "#") {
    throw new Error("Invalid hex string");
  }

  const result = [];
  if (hexArr.length === 3) {
    // 3 digits
    for (let i = 0; i < 3; i++) {
      const digit = hexArr[i];
      result.push(parseInt(digit + digit, 16));
    }
    result.push(1);
  } else if (hexArr.length === 4) {
    // 4 digits
    for (let i = 0; i < 4; i++) {
      const digit = hexArr[i];
      const num = parseInt(digit + digit, 16);
      if (i === 3) {
        result.push(Math.round((num / 255) * 100) / 100);
      } else {
        result.push(num);
      }
    }
  } else if (hexArr.length === 6) {
    // 6 digits
    for (let i = 0; i < 6; i += 2) {
      const digit = hexArr[i] + hexArr[i + 1];
      result.push(parseInt(digit, 16));
    }
    result.push(1);
  } else if (hexArr.length === 8) {
    // 8 digits
    for (let i = 0; i < 8; i += 2) {
      const digit = hexArr[i] + hexArr[i + 1];
      const num = parseInt(digit, 16);
      if (i === 6) {
        result.push(Math.round((num / 255) * 100) / 100);
      } else {
        result.push(parseInt(digit, 16));
      }
    }
  } else {
    throw new Error("Invalid hex string");
  }

  return `rgba(${result.join(",")})`;
}
