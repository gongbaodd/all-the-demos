/**
 * @param {any} input
 * @return {(observable: Observable) => Observable}
 * returns a function which trasnform Observable
 */
function map(transform) {
  // your code here

  return (observable) => {
    return new Observable((observer) => {
      return observable.subscribe({
        next: (value) => observer.next(transform(value)),
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
  };
}
