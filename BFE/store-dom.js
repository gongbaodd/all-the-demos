/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */
const findCorrespondingNode = (rootA, rootB, target) => {
  // your code here
  if (rootA === target) return rootB;

  for (let i = 0; i < rootA.children.length; i++) {
    let result = findCorrespondingNode(
      rootA.children[i],
      rootB.children[i],
      target
    );
    if (result) return result;
  }
};
