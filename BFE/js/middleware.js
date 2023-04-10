class Middleware {
  /**
   * @param {MiddlewareFunc} func
   */
  #middlewares = [];
  #req = null;
  #error = null;
  use(func) {
    this.#middlewares.push(func);
  }

  /**
   * @param {Request} req
   */
  start(req) {
    this.#req = req;
    this.#next(req);
  }
  #next = (req, err) => {
    const middleware = this.#middlewares.shift();

    if (err) {
      if (middleware?.length === 3) {
        try {
          middleware(err, req, () => this.#next(req));
        } catch (e) {
          this.#next(req, e);
        }
      } else {
        this.#next(req, err);
      }
      return;
    }

    if (middleware?.length === 2) {
      try {
        middleware(req, (err) => {
          this.#next(req, err);
        });
      } catch (e) {
        this.#next(req, e);
      }
    } else {
      middleware?.(this.#error, req, () => this.#next(req));
    }
  };
}

const req = {};
const middleware = new Middleware();
const error1 = new Error("error");
middleware.use((req, next) => {
  setTimeout(() => {
    req.a = 1;
    next();
  }, 100);
});
middleware.use((req, next) => {
  req.b = 2;
  throw error1;
});
middleware.use((req, next) => {
  setTimeout(() => {
    req.c = 3;
    next();
  }, 20);
});
middleware.use((req, next) => {
  expect("called").toBe("not called");
  done();
});
middleware.use((_error, req, next) => {
  expect(req).toEqual({ a: 1, b: 2 });
  expect(_error).toBe(error1);
  done();
});
middleware.start(req);
