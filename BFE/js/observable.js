const STATES = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class Observable {
  #setup = null;
  #Subscriber = class {
    #state = "pending";
    constructor(sub, setup) {
      if (typeof sub === "function") {
        sub = { next: sub };
      }

      setup({
        next: (value) => {
          this.#state === STATES.PENDING && sub.next?.(value);
        },
        error: (error) => {
          this.#state === STATES.PENDING && sub.error?.(error);
          this.#state = STATES.REJECTED;
        },
        complete: () => {
          this.#state === STATES.PENDING && sub.complete?.();
          this.#state = STATES.FULFILLED;
        },
      });
    }

    unsubscribe() {
      this.#state = STATES.REJECTED;
    }
  };

  constructor(setup) {
    this.#setup = setup;
  }

  subscribe(subscriber) {
    const sub = new this.#Subscriber(subscriber, this.#setup);
    return sub;
  }
}

const observable = new Observable((subscriber) => {
  subscriber.error("error1");
  subscriber.error("error2");
  subscriber.next("value");
  subscriber.complete();
});

const values = [];
const errors = [];
const complete = jasmine.createSpy();
const observer = {
  next: (value) => values.push(value),
  error: (error) => errors.push(error),
  complete,
};
