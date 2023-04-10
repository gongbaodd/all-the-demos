/**
 * @param {Array | ArrayLike | Promise | Iterable | Observable} input
 * @return {Observable}
 */
function from(input) {
  // your code here

  if (input instanceof Observable) {
    return input;
  }

  if (input instanceof Promise) {
    return new Observable((observer) => {
      input
        .then(
          (value) => {
            observer.next(value);
          },
          (error) => observer.error(error)
        )
        .then(() => observer.complete());
    });
  }

  if (Array.isArray(input) || input.length) {
    return new Observable((observer) => {
      Array.from(input).forEach((item) => observer.next(item));
      observer.complete();
    });
  }

  if (typeof input[Symbol.iterator] === "function") {
    return new Observable((observer) => {
      try {
        for (const item of input) {
          observer.next(item);
        }
      } catch (error) {
        observer.error(error);
      }

      observer.complete();
    });
  }

  throw new Error("Invalid input");
}
