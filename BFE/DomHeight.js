/**
 * @param {HTMLElement | null} tree
 * @return {number}
 */
function getHeight(tree) {
  // your code here
  if (tree === null) return 0;

  let height = 0;

  for (let i = 0; i < tree.children.length; i++) {
    height = Math.max(height, getHeight(tree.children[i]));
  }

  return height + 1;
}
