/**
 * cancel all timer from window.setTimeout
 */
function clearAllTimeout() {
  // your code here
  let id = setTimeout(() => {}, 0);
  while (id--) {
    clearTimeout(id);
  }
}
