/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(tree) {
  // your code here
  let tags = new Set();

  function getTagsHelper(tree) {
    tags.add(tree.tagName.toLowerCase());
    for (let i = 0; i < tree.children.length; i++) {
      getTagsHelper(tree.children[i]);
    }
  }

  getTagsHelper(tree);

  return Array.from(tags);
}
