/**
 * @param {Element} root
 * @param {Element} target
 * @return {Elemnt | null}
 */
function previousLeftSibling(root, target) {
  // your code here

  if (!root || !target) return null;

  const queue = [];
  queue.push(root);
  let rowEnd = root.children[root.children.length - 1];
  let targetFound = false;

  while (queue.length) {
    const node = queue.shift();

    if (node.children && !targetFound) {
      if (node === rowEnd) {
        rowEnd = node.children[node.children.length - 1];
      }
      for (let i = 0; i < node.children.length; i++) {
        queue.push(node.children[i]);

        if (node.children[i] === target) {
          targetFound = true;
        }
      }
    }

    if (targetFound) {
      if (queue[0] === target) {
        if (node === rowEnd) {
          return null;
        }

        return node;
      }
    }
  }
}

const root = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "p",
          children: [
            {
              type: "a",
            },
          ],
        },
        {
          type: "p",
          children: [
            {
              type: "button",
            },
          ],
        },
      ],
    },
    {
      type: "div",
      children: [{ type: "p" }],
    },
    {
      type: "div",
      children: [
        {
          type: "p",
          children: [
            {
              type: "a",
            },
            {
              type: "a",
            },
          ],
        },
      ],
    },
  ],
};

console.log(
  previousLeftSibling(root, root.children[0].children[0].children[0])
);
