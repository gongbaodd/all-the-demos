/**
 * @param {string} str - binary string
 * @returns {string}
 */
function myBtoa(str) {
  // your code here
  const base64 =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let result = "";
  let i = 0;
  do {
    const a = str.charCodeAt(i++);
    const b = str.charCodeAt(i++);
    const c = str.charCodeAt(i++);
    a = a ? a : 0;
    b = b ? b : 0;
    c = c ? c : 0;
    const b1 = (a >> 2) & 0x3f;
    const b2 = ((a & 0x3) << 4) | ((b >> 4) & 0xf);
    const b3 = ((b & 0xf) << 2) | ((c >> 6) & 0x3);
    const b4 = c & 0x3f;
    if (!b) {
      b3 = b4 = 64;
    } else if (!c) {
      b4 = 64;
    }
    result +=
      base64.charAt(b1) +
      base64.charAt(b2) +
      base64.charAt(b3) +
      base64.charAt(b4);
  } while (i < str.length);
  return result;
}
