import { useRef, useEffect } from "react";

export function usePrevious<T>(value: T): T | undefined {
  // your code here
  const previous = useRef<T>();

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return previous.current;
}

// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }
