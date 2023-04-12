// This is a React coding question from BFE.dev

import React, { useCallback, useEffect, useRef } from "react";

export function useClickOutside(_callback: () => void) {
  // your code here

  const $elem = useRef<HTMLElement>();

  const callback = useCallback((e: MouseEvent) => {
    if ($elem.current && !$elem.current.contains(e.target as Node)) {
      _callback();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", callback);

    return () => {
      document.removeEventListener("mousedown", callback);
    };
  }, []);

  return $elem;
}

// to try your code on the right panel
// export App() component like below

// export function App() {
//   return <div>your app</div>
// }
