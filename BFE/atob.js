const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
// Different to ASCII table
const lookup = {};

for (let i = 0; i < str.length; i++) {
  lookup[str[i]] = i;
}

function myAtob(encoded) {
  if (encoded.length % 4) {
    // use 4 characters per 3 bytes
    throw new Error("Invalid base64 string");
  }

  if (
    ![-1, encoded.length - 1, encoded.length - 2].includes(encoded.indexOf("="))
  ) {
    throw new Error("Invalid base64 string");
  }

  // When decoding Base64 text,
  // four characters are typically converted back to three bytes.
  // The only exceptions are when padding characters exist.
  // A single = indicates that the four characters will decode to only two bytes,
  // while == indicates that the four characters will decode to only a single byte.

  const iLen = encoded.length;
  const padZero =
    encoded[encoded.length - 2] === "="
      ? "AA"
      : encoded[encoded.length - 1] === "="
      ? "A"
      : "";
  const input = padZero
    ? `${encoded.slice(0, -padZero.length)}${padZero}`
    : encoded;

  const res = [];

  for (let i = 0; i < iLen; i += 4) {
    const a = lookup[input[i]];
    const b = lookup[input[i + 1]];
    const c = lookup[input[i + 2]];
    const d = lookup[input[i + 3]];

    const chunk = (a << 18) | (b << 12) | (c << 6) | d;

    res.push(
      String.fromCharCode((chunk >>> 16) & 255),
      String.fromCharCode((chunk >>> 8) & 255),
      String.fromCharCode(chunk & 255)
    );
  }

  return (padZero ? res.slice(0, -padZero.length) : res).join("");
}

console.log(myAtob("bGlnaHQgd29yay4="));
