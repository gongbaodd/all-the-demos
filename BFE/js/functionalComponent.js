/**
 * MyElement is the type your implementation supports
 *
 * type MyNode = MyElement | string
 * type FunctionComponent = (props: object) => MyElement
 */

/**
 * @param { string | FunctionComponent } type - valid HTML tag name or Function Component
 * @param { object } [props] - properties.
 * @param { ...MyNode} [children] - elements as rest arguments
 * @return { MyElement }
 */
function createElement(type, props, ...children) {
  // your code here
  if (typeof type === "function") {
    return type({ ...props, children });
  }

  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

/**
 * @param { MyElement }
 * @returns { HTMLElement }
 */
function render(myElement) {
  // your code here
  if (typeof myElement === "string") {
    return document.createTextNode(myElement);
  }

  const {
    type,
    props: { children, ...props },
  } = myElement;
  const node = document.createElement(type);
  for (const [key, value] of Object.entries(props)) {
    node[key] = value;
  }
  const childNodes = Array.isArray(children) ? children : [children];
  for (const child of childNodes) {
    node.appendChild(render(child));
  }
  return node;
}
