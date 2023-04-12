import React, { useRef, useEffect } from "react";

export function useIsMounted(): () => boolean {
  // your code here
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return () => isMounted.current;
}

// to try your code on the right panel
// export App() component like below

// export function App() {
//   return <div>BFE.dev</div>;
// }
