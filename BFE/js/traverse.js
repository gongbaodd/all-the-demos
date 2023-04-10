/**
 * @param {HTMLElement | null} root
 * @return {HTMLElement[]}
 */
function flatten(root) {
  // your code here
  const result = [];
  if (!root) {
    return result;
  }
  const stack = [root];
  while (stack.length) {
    const node = stack.shift();
    if (node) {
      result.push(node);
      stack.push(...node.children);
    }
  }
  return result;
}
