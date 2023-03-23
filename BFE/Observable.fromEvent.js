/**
 * @param {HTMLElement} element
 * @param {string} eventName
 * @param {boolean} capture
 * @return {Observable}
 */
function fromEvent(element, eventName, capture = false) {
  // your code here

  return new Observable((observer) => {
    const handler = (event) => observer.next(event);

    element.addEventListener(eventName, handler, capture);

    return {
      unsubscribe: () => {
        element.removeEventListener(eventName, handler, capture);
      },
    };
  });
}
