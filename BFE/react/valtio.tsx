import React, { useState } from "react";

export function proxy<T extends object>(initialValue: T): T {
  // your code here
  let forceUpdate: React.Dispatch<React.SetStateAction<number>>;
  const rendered = new Set<keyof T>();

  return new Proxy<T>(initialValue, {
    get(target, prop) {
      // your code here
      rendered.add(prop as keyof T);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      // your code here
      if (prop === "forceUpdate") {
        forceUpdate = value;
        return false;
      }

      if (Reflect.get(target, prop) === value) {
        return true; // no change do not update
      }

      const result = Reflect.set(target, prop, value);
      const isRendered = rendered.has(prop as keyof T);

      if (result && isRendered && forceUpdate) {
        forceUpdate((count: number) => count + 1);
        rendered.clear(); // recalculate rendered
      }

      return result;
    },
  });
}

export function useSnapshot<T extends object>(proxy: T): T {
  // your code here
  const [_, forceUpdate] = useState(0);

  Reflect.set(proxy, "forceUpdate", forceUpdate);

  return proxy;
}

// to try your code on the right panel
// export App() component like below

const state = proxy({ count: 100, text: "BFE.dev", mode: "count" });

let renderCount = 0;

export function App() {
  const snap = useSnapshot(state);
  renderCount += 1;
  return <div>{snap.mode === "count" ? snap.count : snap.text}</div>;
}
setTimeout(() => {
  state.text = "bigfrontend.dev";
  console.log(renderCount); // 1
}, 100);

setTimeout(() => {
  state.count = 101;
  console.log(renderCount); // 2
}, 200);

setTimeout(() => {
  state.mode = "text";
  console.log(renderCount); // 3
}, 300);

setTimeout(() => {
  state.count = 102;
  console.log(renderCount); // 3
}, 400);

setTimeout(() => {
  state.text = "BFE.dev";
  console.log(renderCount); // 4
}, 500);
