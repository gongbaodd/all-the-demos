/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {HTMLElemnt | null}
 */
function nextRightSibling(root, target) {
  // your code here
  if (target === null) return null;
  if (root === target) return null;

  let queue = [root];
  let found = false;
  while (queue.length > 0) {
    let node = queue.shift();
    if (found) {
      return node;
    }
    if (node === target) {
      found = true;
    }
    if (node.children.length > 0) {
      queue.push(...node.children);
    }
  }
  return null;
}
