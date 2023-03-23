/**
 * @param {number} period
 * @return {Observable}
 */
function interval(period) {
  // your code here
  return new Observable((observer) => {
    let counter = 0;
    const intervalId = setInterval(() => {
      observer.next(counter++);
    }, period);

    return {
      unsubscribe: () => {
        clearInterval(intervalId);
      },
    };
  });
}
