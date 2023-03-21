const STATES = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  #state = STATES.PENDING;
  #value = undefined;
  #resolve = (v) => {
    if (this.#state !== STATES.PENDING) return;
    this.#state = STATES.FULFILLED;
    this.#value = v;

    queueMicrotask(() => {
      this.#onFulfilled(this.#value);
    });
  };
  #reject = (e) => {
    if (this.#state === STATES.PENDING) {
      this.#state = STATES.REJECTED;
      this.#value = e;
    }
  };
  #onFulfilled = () => {};
  constructor(executor) {
    try {
      executor(this.#resolve, this.#reject);
    } catch (e) {
      this.#reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    // your code here
    this.#onFulfilled = onFulfilled;
    return new MyPromise((resolve, reject) => {});
  }

  catch(onRejected) {
    // your code here
  }

  static resolve(value) {
    // your code here
    let myPromise = new MyPromise((resolve) => {
      resolve(value);
    });

    return myPromise;
  }

  static reject(value) {
    // your code here
    let myPromise = new MyPromise((resolve, reject) => {
      reject(value);
    });
    return myPromise;
  }
}
