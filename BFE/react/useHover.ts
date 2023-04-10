import { Ref, useState, useRef, useCallback } from "react";

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
  // your code here
  const [isHovered, setIsHovered] = useState(false);
  const abortCtrl = useRef(new AbortController());

  const elem = useRef<T>();

  const callback = useCallback((node) => {
    if (elem.current) {
      abortCtrl.current.abort();
      abortCtrl.current = new AbortController();
    }

    if (node) {
      const { signal } = abortCtrl.current;

      elem.current = node;
      node.addEventListener("mouseenter", () => setIsHovered(true), { signal });
      node.addEventListener("mouseleave", () => setIsHovered(false), {
        signal,
      });
    }
  }, []);

  return [callback, isHovered];
}

// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }
