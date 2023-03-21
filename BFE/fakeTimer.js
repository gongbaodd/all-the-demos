class FakeTimer {
  #env = new Map();
  #id = 0;
  #storage = new Map();

  #setTimeout = (fn, delay) => {
    // schedule the function to be run after delay milliseconds
    let id = ++this.#id;
    const end = Date.now() + delay;
    this.#storage.set(id, { fn, end });

    return id;
  };
  #clearTimeout = (id) => {
    // cancel the scheduled function
    this.#storage.delete(id);
  };
  #Date = class {
    static current = 0;
    static now() {
      return this.current;
    }
  };

  install() {
    // replace window.setTimeout, window.clearTimeout, Date.now
    // with your implementation
    this.#env.set("setTimeout", window.setTimeout);
    this.#env.set("clearTimeout", window.clearTimeout);
    this.#env.set("Date", Date);

    window.setTimeout = this.#setTimeout;
    window.clearTimeout = this.#clearTimeout;
    Date = this.#Date;
  }

  uninstall() {
    // reenv the original implementation of
    // window.setTimeout, window.clearTimeout, Date.now
    window.setTimeout = this.#env.get("setTimeout");
    window.clearTimeout = this.#env.get("clearTimeout");
    Date = this.#env.get("Date");
  }

  tick() {
    // run the scheduled functions without waiting
    while (this.#storage.size) {
      let smallend = this.#Date.current;
      let scheduled = null;

      for (let [id, { fn, end }] of this.#storage) {
        // find the smallest end
        if (smallend === this.#Date.current || end < smallend) {
          smallend = end;
          scheduled = { id, fn, end };
        }
      }

      this.#Date.current = scheduled.end;
      scheduled.fn();
      this.#storage.delete(scheduled.id);
    }
  }
}

function window() {}

const fakeTimer = new FakeTimer();
fakeTimer.install();

const logs = [];
const log = (arg) => {
  logs.push([Date.now(), arg]);
};

setTimeout(() => {
  setTimeout(() => {
    setTimeout(() => {
      log("A");
    }, 100);
  }, 100);
}, 100);

const b = setTimeout(() => log("B"), 300);
setTimeout(() => {
  setTimeout(() => {
    clearTimeout(b);
  }, 40);
}, 250);

fakeTimer.tick();
fakeTimer.uninstall();
console.log(logs);
