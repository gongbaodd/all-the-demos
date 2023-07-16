import { useEffect } from "react";

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
interface IPromiseWithStatus<T> extends Promise<T> {
  status?: typeof PENDING | typeof FULFILLED | typeof REJECTED;
  value?: T;
  reason?: any;
}

export function future<T>() {
  let p: IPromiseWithStatus<T> | null = null;

  function use(fn: () => IPromiseWithStatus<T>) {
    if (p === null) {
      p = fn();
    }
    const promise = p;

    useEffect(() => {
      return () => {
        p = null;
      }
    })

    const { status } = promise;
    if (status === FULFILLED) {
      return promise.value;
    }

    if (status === REJECTED) {
      throw promise.reason;
    }

    if (status === PENDING) {
      throw promise;
    }

    promise.status = PENDING;
    promise.then(
      result => {
        promise.status = FULFILLED;
        promise.value = result;
      },
      error => {
        promise.status = REJECTED;
        promise.reason = error;
      }
    )
    throw promise;
  }

  return use;
}
