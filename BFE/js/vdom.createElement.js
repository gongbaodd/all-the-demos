/**
 * MyElement is the type your implementation supports
 *
 * type MyNode = MyElement | string
 */

/**
 * @param { string } type - valid HTML tag name
 * @param { object } [props] - properties.
 * @param { ...MyNode} [children] - elements as rest arguments
 * @return { MyElement }
 */
function createElement(type, props, ...children) {
  // your code here
  let element = {
    type,
    props: {
      ...props,
      children,
    },
  };
  return element;
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

  let {
    type,
    props: { children, ...rest },
  } = myElement;

  let dom = document.createElement(type);

  for (let [key, value] of Object.entries(rest)) {
    dom[key] = value;
  }

  if (!Array.isArray(children)) children = [children];
  for (let child of children) {
    dom.appendChild(render(child));
  }

  return dom;
}
