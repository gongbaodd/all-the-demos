/**
 * @param {code} string
 * @returns {any} AST
 */
function parse(code) {
  // your code here
  code = code.trim();
  if (!isValid(code)) {
    return null;
  }

  const frontltSymIndex = code.indexOf("<");
  const frontgtSymIndex = code.indexOf(">");
  const s = code.slice(frontltSymIndex + 1, frontgtSymIndex).trim();
  if (s.includes("/")) {
    // Opening tag should not have "/"
    return;
  }
  const arr = s.split(" ");
  const tagName = arr[0];
  const props = {};
  for (let i = 1; i < arr.length; i++) {
    const [key, value] = arr[i].split("=");
    props[key] = value;
  }

  const lastltSymIndex = code.lastIndexOf("<");
  const lastgtSymIndex = code.lastIndexOf(">");
  const tagName2 = code
    .slice(lastltSymIndex + 1, lastgtSymIndex)
    .replaceAll(" ", "");
  if (tagName2[0] !== "/" || tagName2.slice(1) !== tagName) {
    // Closing tag should have "/"
    return;
  }

  const children = code.slice(frontgtSymIndex + 1, lastltSymIndex);
  props.children = children ? [children] : [];

  return {
    openingElement: {
      name: tagName,
    },
    closingElement: {
      name: tagName,
    },
    props,
  };

  function isValid(code) {
    if (code[0] !== "<" || code[code.length - 1] !== ">") {
      return false;
    }
    const splitlt = code.split("<");
    const splitgt = code.split(">");
    if (splitlt.length !== splitgt.length) {
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
  return {
    type: ast.openingElement.name,
    props: ast.props,
  };
}

console.log(parse("  <  a  >  bfe.dev  <  /  a  >  "));
