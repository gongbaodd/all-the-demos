/**
 * @param {HTMLElement}
 * @return {object} object literal presentation
 */
function virtualize(element) {
  // your code here
  if (!element) return null;
  const obj = {
    type: element.nodeName.toLowerCase(),
    props: {},
  };

  //   element.className && (obj.props.className = element.className);
  //   element.href && (obj.props.href = element.href);

  if (element.hasAttributes()) {
    for (let { name, value } of element.attributes) {
      obj.props[name === "class" ? "className" : name] = value;
    }
  }

  if (element.hasChildNodes()) {
    obj.props.children = [];

    for (let node of element.childNodes) {
      if (node.nodeType === 3) {
        obj.props.children.push(node.textContent);
      } else if (node.nodeType === 1) {
        obj.props.children.push(virtualize(node));
      }
    }

    if (obj.props.children.length === 1) {
      obj.props.children = obj.props.children[0];
    }
  }

  return obj;
}

/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement}
 */
function render(obj) {
  // your code here
  if (!obj) return null;
  let {
    type,
    props: { children, className, ...rest },
  } = obj;

  const element = document.createElement(type);

  className && (element.className = className);

  if (children) {
    if (typeof children === "string") {
      children = [children];
    }

    for (let i = 0; i < children.length; i++) {
      if (typeof children[i] === "string") {
        element.appendChild(document.createTextNode(children[i]));
        continue;
      }
      element.appendChild(render(children[i]));
    }
  }

  if (rest) {
    for (let key in rest) {
      element.setAttribute(key, rest[key]);
    }
  }

  return element;
}
