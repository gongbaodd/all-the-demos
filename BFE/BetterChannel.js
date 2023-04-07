const data = {};

class SomeChannel {
  port1 = {
    postMessage: (message) => {
      data.messagefrom1 = message;
    },
  };

  port2 = {
    postMessage: (message) => {
      data.messagefrom2 = message;
    },
  };

  constructor() {
    Object.defineProperty(this.port2, "onmessage", {
      set: (callback) => {
        Object.defineProperty(data, "messagefrom1", {
          set: (message) => {
            callback(message);
          },
        });
      },
      get: () => {},
      configurable: true,
    });

    Object.defineProperty(this.port1, "onmessage", {
      set: (callback) => {
        Object.defineProperty(data, "messagefrom2", {
          set: (message) => {
            callback(message);
          },
        });
      },
    });
  }
}

// const { port1, port2 } = new SomeChannel();

// port2.onmessage = (msg) => {
//   console.log(msg);
// };

// port1.onmessage = (msg) => {
//   console.log(msg);
// };
// port1.postMessage("hi1");
// port2.postMessage("hi2");

// This is a JavaScript coding problem from BFE.dev

// interface SomePort {
//   postMessage: (message: string) => void
//   onmessage?: (message: string) => void
// }

// declare class SomeChannel {
//   port1: SomePort
//   port2: SomePort
// }

class BetterChannel {
  constructor() {
    const { port1, port2 } = new SomeChannel();
    this.port1 = this.#createPort(port1);
    this.port2 = this.#createPort(port2);
  }

  #createPort = (port /*SomePort*/) => {
    const onmessageHandlers = [];

    port.onmessage = (message) => {
      for (const handler of onmessageHandlers) {
        handler(message);
      }
    };

    const newPort = {
      postMessage: (toSendData, onReply) => {
        const isStrMsg = typeof toSendData === "string";
        const toSend = isStrMsg ? toSendData : toSendData.message;
        let key = isStrMsg ? Symbol.for(toSend) : toSendData.key;
        let replied = false;

        listen();

        port.postMessage({
          key,
          message: toSend,
        });

        function listen() {
          if (onReply) {
            onmessageHandlers.push(({ message: received, key: rKey }) => {
              if (replied) return;
              if (rKey !== key) return;
              onReply(received);
              replied = true;
            });
          }
        }
      },
    };

    onmessageHandler((callback) => {
      onmessageHandlers.push(({ message: received, key }) => {
        callback(received, reply);

        function reply(message) {
          newPort.postMessage({ message, key });
        }
      });
    });

    return newPort;

    function onmessageHandler(callback) {
      Object.defineProperty(newPort, "onmessage", {
        set: callback,
      });
    }
  };
}

const { port1, port2 } = new BetterChannel();

port1.postMessage("1?", () => {
  console.log("nooooo");
});

port2.postMessage("1");
