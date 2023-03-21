/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function sort(items, newOrder) {
  // reorder items inline
  return items.sort((a, b) => {
    const aIndex = items.indexOf(a);
    const bIndex = items.indexOf(b);

    return newOrder[aIndex] - newOrder[bIndex];
  });
}
