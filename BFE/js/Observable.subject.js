// You can use Observer which is bundled to your code

// class Observer {
//   // subscriber could one next function or a handler object {next, error, complete}
//   constructor(subscriber) { }
//   next(value) { }
//   error(error) { }
//   complete() {}
// }

class Subject {
  #subscribers = [];
  constructor() {}
  subscribe = (subscriber) => {
    const observer = new Observer(subscriber);
    this.#subscribers.push(observer);

    return {
      unsubscribe: () => {
        this.#subscribers = this.#subscribers.filter((sub) => sub !== observer);
      },
    };
  };

  next = (value) => {
    this.#subscribers.forEach((subscriber) => subscriber.next(value));
  };
}
