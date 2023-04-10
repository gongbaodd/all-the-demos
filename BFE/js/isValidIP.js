/**
 * @param {string} str
 * @return {boolean}
 */
function isValidIP(str) {
  // your code here
  if (str.indexOf(".") > 0) {
    // IPv4
    let arr = str.split(".");
    if (arr.length !== 4) return false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "") return false;
      if (arr[i][0] === "0" && arr[i].length > 1) return false;
      if (arr[i] < 0 || arr[i] > 255) return false;
      if (arr[i].match(/[^0-9]/gi)) return false;
    }
    return true;
  }

  // IPv6
  if (str.indexOf(":") > 0) {
    let arr = str.split(":");
    if (arr.length !== 8) return false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "") return false;
      if (arr[i].length > 4) return false;
      if (arr[i].match(/[^0-9a-f]/gi)) return false;
    }
    return true;
  }

  return false;
}

isValidIP("1.1.1.1");
