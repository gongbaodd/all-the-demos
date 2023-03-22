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
      try {
        const returnValue = this.#onFulfilled(this.#value);
        if (returnValue instanceof MyPromise) {
          returnValue.then(this.#then.resolve, this.#then.reject);
        } else {
          this.#then.resolve(returnValue);
        }
      } catch (e) {
        this.#then.reject(e);
      }
    });
  };
  #reject = (e) => {
    if (this.#state !== STATES.PENDING) return;
    this.#state = STATES.REJECTED;
    this.#value = e;

    queueMicrotask(() => {
      try {
        const returnValue = this.#onRejected(this.#value);

        if (returnValue instanceof MyPromise) {
          returnValue.then(this.#then.resolve, this.#then.reject);
        } else {
          this.#then.resolve(returnValue);
        }
      } catch (e) {
        this.#then.reject(e);
      }
    });
  };
  #onFulfilled = () => {};
  #onRejected = (e) => {
    throw e;
  };
  #then = {
    resolve: () => {},
    reject: () => {},
  };
  constructor(executor) {
    try {
      executor(this.#resolve, this.#reject);
    } catch (e) {
      this.#reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    // your code here
    this.#onFulfilled = onFulfilled ?? this.#onFulfilled;
    this.#onRejected = onRejected ?? this.#onRejected;
    return new MyPromise((resolve, reject) => {
      this.#then.resolve = resolve;
      this.#then.reject = reject;
    });
  }

  catch(onRejected) {
    // your code here
    return this.then(undefined, onRejected);
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
    let myPromise = new MyPromise((_, reject) => {
      reject(value);
    });
    return myPromise;
  }
}

/* normal test
MyPromise.resolve(1).then((v) => {
  console.log(v); // 1
});
*/

//* catch error test
const mp = new MyPromise((resolve, reject) => {
  reject("bfe");
});
mp.then((data) => {
  console.log("not called");
}).catch((error) => {
  console.log(error); // bfe
});
//*/
