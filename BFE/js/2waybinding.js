/**
 * @param {{value: string}} state
 * @param {HTMLInputElement} element
 */
function model(state, element) {
  // your code here
  element.value = state.value;

  Object.defineProperty(state, "value", {
    get: function () {
      return element.value;
    },
    set: function (newValue) {
      element.value = newValue;
    },
  });
}
