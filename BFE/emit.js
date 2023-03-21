// please complete the implementation
class EventEmitter {
  #watchers = new Map();
  subscribe(eventName, callback) {
    let callbackindex = -1;

    if (!this.#watchers.has(eventName)) {
      this.#watchers.set(eventName, []);
    }

    const events = this.#watchers.get(eventName);
    events.push(callback);
    callbackindex = events.length - 1;

    return {
      release() {
        if (callbackindex > -1) {
          events.splice(callbackindex, 1);
        } else {
          callbackindex = -1;
        }
      },
    };
  }

  emit(eventName, ...args) {
    if (this.#watchers.has(eventName)) {
      const events = this.#watchers.get(eventName);
      events.forEach((callback) => callback(...args));
    }
  }
}
