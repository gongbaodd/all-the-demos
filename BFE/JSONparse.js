/**
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
function parse(str) {
  // your code here
  let result = null;
  const start = str[0];

  switch (start) {
    case "{":
      {
        result = {};
        const arr = str.slice(1, str.length - 1).split(",");
        arr.forEach((item) => {
          if (!item) return;
          const [key, ...value] = item.split(":");

          if (key[0] === "'") throw new Error("Invalid key");
          if (value[0] === "") throw new Error("Invalid value");

          result[key.slice(1, -1)] = parse(value.join(":"));
        });
      }
      break;
    case "[":
      {
        result = [];

        if (str[str.length - 1] === ",") throw new Error("Invalid array");

        const arr = str.slice(1, str.length - 1).split(",");
        arr.forEach((item) => {
          result.push(parse(item));
        });
      }
      break;
    case "t":
      result = true;
      break;
    case "f":
      result = false;
      break;
    case "n":
      result = null;
      break;
    case '"':
      result = str.slice(1, str.length - 1);
      break;
    default:
      result = Number(str);
  }

  return result;
}

parse("[1,2,]");
