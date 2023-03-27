/**
 * @param {Node} head
 * @return {boolean}
 */
function hasCircle(head) {
  // your code here
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }

  return false;
}
