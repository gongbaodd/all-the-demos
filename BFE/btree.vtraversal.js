/**
 * @param {Node} root
 * @returns {number[]}
 */
function traverse(root) {
  // your code here
  const bitmap = new Map();
  let minX = 0;
  let maxX = 0;
  const results = [];

  walk(root);

  for (let i = minX; i <= maxX; i++) {
    const xResults = [];

    for (let [{ x, y }, { v, px }] of bitmap.entries()) {
      if (x === i) {
        xResults.push({ v, y, px });
      }
    }

    xResults.sort((a, b) => {
      const y = a.y - b.y;
      if (y !== 0) {
        return y;
      }

      return a.px - b.px;
    });

    results.push(xResults.map(({ v }) => v));
  }

  return results.flat();

  function walk(node, x = 0, y = 0, parentX = 0) {
    if (!node) {
      return;
    }

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);

    bitmap.set({ x, y }, { v: node.value, px: parentX });

    walk(node.left, x - 1, y + 1, x);
    walk(node.right, x + 1, y + 1, x);
  }
}

const nodes = {
  value: 1,
  left: {
    value: 3,
    left: null,
    right: {
      value: 4,
      left: {
        value: 6,
        left: {
          value: 14,
          left: null,
          right: null,
        },
        right: {
          value: 12,
          left: null,
          right: null,
        },
      },
      right: {
        value: 13,
        left: {
          value: 10,
          left: null,
          right: null,
        },
        right: null,
      },
    },
  },
  right: {
    value: 2,
    left: {
      value: 5,
      left: {
        value: 7,
        left: null,
        right: {
          value: 11,
          left: null,
          right: null,
        },
      },
      right: {
        value: 8,
        left: {
          value: 9,
          left: null,
          right: null,
        },
        right: null,
      },
    },
    right: null,
  },
};

console.log(traverse(nodes)); // [14,3,6,7,1,4,5,12,11,10,9,2,13,8]
