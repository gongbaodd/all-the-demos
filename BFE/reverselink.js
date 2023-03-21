/**
 * class Node {
 *  new(val: number, next: Node);
 *    val: number
 *    next: Node
 * }
 */

/**
 * @param {Node} list
 * @return {Node}
 */
const reverseLinkedListRecur = (list) => {
  // your code
  if (list.next) {
    const next = list.next;
    list.next = null;
    const reversed = reverseLinkedListRecur(next);
    next.next = list;
    return reversed;
  }

  return list;
};

const reverseLinkedList = (list) => {
  // your code
  let prev = null;
  let curr = list;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};
