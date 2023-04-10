class FakeTimer {
  #storage = new Map();
  #runners = new Set(); // { run, end, id}
  #id = 0;
  #sort = () => {
    this.#runners = new Set([...this.#runners].sort((a, b) => a.end - b.end));
  };
  #setInterval = (fn, delay) => {
    // schedule the function to be run after delay milliseconds
    let id = ++this.#id;

    const run = () => {
      const end = Date.now() + delay;
      const runner = () => {
        run();
        fn();
      };

      this.#runners.add({ run: runner, end, id });
      this.#sort();
    };

    run();
    return id;
  };
  #clearInterval = (id) => {
    // cancel the scheduled function
    this.#runners.forEach((runner) => {
      if (runner.id === id) {
        this.#runners.delete(runner);
      }
    });
  };
  #Date = {
    current: 0,
    now() {
      return this.current;
    },
  };
  install() {
    // replace window.setInterval, window.clearInterval, Date.now
    // with your implementation
    this.#storage.set("setInterval", window.setInterval);
    this.#storage.set("clearInterval", window.clearInterval);
    this.#storage.set("Date", Date);

    window.setInterval = this.#setInterval;
    window.clearInterval = this.#clearInterval;
    Date = this.#Date;
  }

  uninstall() {
    // restore the original implementation of
    // window.setInterval, window.clearInterval, Date.now
    this.#runners.clear();

    window.setInterval = this.#storage.get("setInterval");
    window.clearInterval = this.#storage.get("clearInterval");
    Date = this.#storage.get("Date");
  }

  tick() {
    // run the scheduled functions without waiting
    while (this.#runners.size) {
      const runner = [...this.#runners][0];
      this.#runners.delete(runner);
      Date.current = runner.end;
      runner.run();
    }
  }
}
