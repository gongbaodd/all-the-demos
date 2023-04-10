/**
 * @param {code} string
 * @returns {any} AST
 */
function parse(code) {
  // your code here
  code = code.trim();

  if (!isValid(code)) throw new Error("Invalid code");

  const tag = (() => {
    const ltsym = code.indexOf("<");
    const gtsym = code.indexOf(">");
    const tag = code.slice(ltsym + 1, gtsym).trim();

    const lastSlashSym = code.lastIndexOf("/");
    const lastGtSym = code.lastIndexOf(">");
    const tag2 = code.slice(lastSlashSym + 1, lastGtSym).trim();

    if (!["<", " "].includes(code[lastSlashSym - 1]))
      throw new Error("Invalid code");

    if (tag !== tag2) throw new Error("Invalid code");

    return tag;
  })(code);

  code = (() => {
    // strip tag
    const firstgt = code.indexOf(">");
    const lastlt = code.lastIndexOf("<");

    return code.slice(firstgt + 1, lastlt);
  })();

  const children = (() => {
    if (code.length === 0) return [];
    {
      // string creteria
      const firstlt = code.indexOf("<");
      const lastgt = code.lastIndexOf(">");

      if (firstlt === -1) return code;
      if (lastgt === -1) return code;
      if (firstlt > lastgt) return code;
    }

    const results = [];

    let start = 0;
    let end = 0;
    let waitCloseTag = false;

    while (end < code.length) {
      if (code[end] === "<" && start !== end && code[end + 1] !== "/") {
        const slice = code.slice(start, end);
        if (!isValid(slice)) {
          results.push(slice);
          start = end;
        }
      }

      if (code[end] === "/") {
        waitCloseTag = true;
      }

      if (waitCloseTag) {
        if (code[end] === ">") {
          const str = code.slice(start, end + 1);

          let isClosedTag = true;
          let slice = str;

          while (slice.includes("<") || slice.includes(">")) {
            const firstGtSym = slice.indexOf(">");
            const lastLtSym = slice.lastIndexOf("<");
            const lastSlashSym = slice.lastIndexOf("/");
            if (firstGtSym > lastLtSym) {
              isClosedTag = false;
            }
            if (lastLtSym !== -1 && lastSlashSym == -1) {
              isClosedTag = false;
            }
            slice = slice.slice(firstGtSym + 1, lastLtSym);
          }

          if (isClosedTag) {
            console.log(str);
            results.push(str);
            start = end + 1;
          }
          waitCloseTag = false;
        }
      }

      end++;
    }

    if (start !== end) {
      results.push(code.slice(start, end));
    }

    return results.map((item) => {
      if (item[0] === "<" && item[item.length - 1] === ">") {
        return parse(item);
      }
      return item;
    });
  })();

  return {
    type: tag,
    props: {
      children,
    },
  };

  function isValid(code) {
    if (code[0] !== "<" || code[code.length - 1] !== ">") {
      return false;
    }

    if (code.split("<").length !== code.split(">").length) {
      return false;
    }

    return true;
  }
}

/**
 * @param {any} your AST
 * @returns {string}
 */
function generate(ast) {
  // your code here
  let children = [];

  if (typeof ast.props.children === "string") {
    children = [ast.props.children];
  } else {
    children = ast.props.children.map((item) => {
      if (typeof item === "string") {
        return item;
      }
      return generate(item);
    });
  }

  return h(ast.type === "Heading" ? Heading : ast.type, null, ...children);
}

console.log(JSON.stringify(parse("<a>bfe.dev</a>")));
