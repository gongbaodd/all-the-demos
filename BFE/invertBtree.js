// This is the type for the node
// type Node = null | {
//   value: number
//   left: Node
//   right: Node
// }

/**
 * @param {Node} node
 * @returns {Node}
 */
function invert(node) {
  // your code here
  if (node === null) return null;
  let temp = node.left;
  node.left = node.right;
  node.right = temp;
  invert(node.left);
  invert(node.right);
  return node;
}
