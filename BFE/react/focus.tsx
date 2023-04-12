import React, { Ref, useState, useRef, useCallback } from "react";

export function useFocus<T extends HTMLInputElement>(): [Ref<T>, boolean] {
  // your code here
  const [isFocused, setFocused] = useState(false);

  const $input = useRef<T>();

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleInput = useCallback((node: T) => {
    $input.current?.removeEventListener("focus", onFocus);
    $input.current?.removeEventListener("blur", onBlur);

    $input.current = node;

    node?.addEventListener("focus", onFocus);
    node?.addEventListener("blur", onBlur);
  }, []);

  return [handleInput, isFocused];
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  const [ref, isFocused] = useFocus();
  return (
    <div>
      <input ref={ref} />
      {isFocused && <p>focused</p>}
    </div>
  );
}
