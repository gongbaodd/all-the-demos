/**
 * @param {string} translation
 * @param {any} data
 * @returns {string}
 */
function t(translation, data = {}) {
  // your code here
  let stack = [];
  let result = "";
  for (let i = 0; i < translation.length; i++) {
    if (
      translation[i] === "{" &&
      translation[i + 1] === "{" &&
      i + 2 < translation.length
    ) {
      i += 2;
      while (translation[i] !== "}" && i < translation.length - 1) {
        stack.push(translation[i]);
        i++;
      }
      if (translation[i + 1] !== "}") {
        result += "{{" + stack.join("") + translation[i];
        stack = [];
        continue;
      }

      result += data[stack.join("")] ?? "";
      i++;
      stack = [];
      continue;
    }

    result += translation[i];
  }

  return result;
}

console.log(t("BFE.dev is {{evaluation}}}{{", { evaluation: "cool" })); // Hello John
