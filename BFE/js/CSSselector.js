// This is a JavaScript coding problem from BFE.dev

/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {string}
 */
function generateSelector(root, target) {
  // your code here
  const path = [];

  walk(root);

  return path
    .map(({ $el }, index, arr) => {
      let name = $el.tagName;
      const parent = arr[index + 1];
      if (parent) {
        const nth = [...parent.$el.children].indexOf($el) + 1;
        return `${name}:nth-child(${nth})`;
      }
      return name;
    })
    .reverse()
    .join(" > ");

  function walk(node) {
    if (!node.children) {
      return;
    }

    for (const child of node.children) {
      if (child === target) {
        path.push({ $el: child });
        path.push({ $el: node });
        return true;
      }

      if (walk(child)) {
        path.push({ $el: node });
        return true;
      }
    }
  }
}

function expect(...args) {
  console.log(...args);
  return {
    toBe: (actual) => {},
  };
}

const div = document.createElement("div");
div.innerHTML = `
<div>
<p>BFE.dev</p>
<div><button>BFE.dev</button></div>
<div>
  is
  <p>
    <span>great. <button id="button">click</button> <button>me!</button></span>
  </p>
  <button>BFE.dev</button>
  <p>bigfrontend.dev <a href="https://bfe.dev">BFE.dev</a> <a href="https://bfe.dev" id="link">BFE.dev</a></p>
  <div>BFE.dev <a>BFE.dev</a></div>
</div>
</div>
`;
const root = div.firstElementChild;
const button = div.querySelector("#button");
let selector = generateSelector(root, button);
expect(root.querySelector(selector)).toBe(button);

const link = div.querySelector("#link");
selector = generateSelector(root, link);
expect(root.querySelector(selector)).toBe(link);
