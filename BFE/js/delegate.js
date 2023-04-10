const handlersMap = new Map();

/**
 * @param {HTMLElement} root
 * @param {(el: HTMLElement) => boolean} predicate
 * @param {(e: Event) => void} handler
 */
function onClick(root, predicate, handler) {
  // your code here
  if (!handlersMap.has(root)) {
    handlersMap.set(root, []);
    // Only one event listener is needed for each root element
    root.addEventListener("click", (e) => {
      let target = e.target;
      let isPropagationStopped = false;
      let isImmediatePropagationStopped = false;
      e.stopPropagation = () => (isPropagationStopped = true);
      e.stopImmediatePropagation = () => (isImmediatePropagationStopped = true);

      while (target !== root) {
        const handlers = handlersMap.get(root);
        for (const { predicate, handler } of handlers) {
          if (predicate(target)) {
            handler.call(target, e);
            if (isImmediatePropagationStopped) return;
          }
        }
        if (isPropagationStopped) break;
        target = target.parentNode;
      }
    });
  }
  handlersMap.get(root).push({ predicate, handler });
}

const root = document.createElement("div");
root.innerHTML = `
  <div id="div1">
    <div id="div2">
      <div id="div3">
        div
      </div>
    </div>
  </div>
`;
const div1 = root.querySelector("#div1");
const div2 = root.querySelector("#div2");
const div3 = root.querySelector("#div3");

const logs = [];
onClick(
  root,
  (el) => el.id === "div1",
  function (e) {
    logs.push(this.id);
  }
);
onClick(
  root,
  (el) => el.id === "div2",
  function (e) {
    logs.push(this.id);
  }
);
onClick(
  root,
  (el) => el.id === "div3",
  function (e) {
    logs.push(this.id);
  }
);
onClick(
  root,
  (el) => el.id === "div3",
  function (e) {
    logs.push(this.id);
    e.stopImmediatePropagation();
  }
);
div3.click();
setTimeout(() => {
  console.log(logs); //["div3", "div3"]
}, 100);
