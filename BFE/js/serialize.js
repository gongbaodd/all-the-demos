// This is the class for the node
// you can use this directly as it is bundled with your code

class Node {
  value;
  left;
  right;
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * @param {Node} root
 * @return {string}
 */
function serialize(root) {
  // your code here
  if (!root) return "null";
  return `${root.value},${serialize(root.left)},${serialize(root.right)}`;
}

/**
 * @param {string} str
 * @return {Node}
 */
function deserialize(str) {
  // your code here
  const arr = str.split(",");

  if (arr[0] === "null") return null;

  const root = new Node(arr[0]);
  const stack = [root];
  let i = 1;
  while (stack.length > 0) {
    const node = stack.pop();
    if (arr[i] && arr[i] !== "null") {
      node.left = new Node(arr[i]);
      stack.push(node.left);
    }
    i++;
    if (arr[i] && arr[i] !== "null") {
      node.right = new Node(arr[i]);
      stack.push(node.right);
    }
    i++;
  }
  return root;
}

const str = [
  1,
  //   2,
  //   3,
  //   4,
  //   null,
  //   null,
  //   5,
  //   6,
  //   7,
  //   8,
  //   null,
  //   null,
  //   null,
  //   null,
  //   9,
].join(",");

const root = deserialize(str);
