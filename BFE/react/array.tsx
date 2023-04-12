// This is a React problem from BFE.dev

import React, { useState, useCallback } from "react";

type UseArrayActions<T> = {
  push: (item: T) => void;
  removeByIndex: (index: number) => void;
};

export function useArray<T>(
  initialValue: T[]
): { value: T[] } & UseArrayActions<T> {
  const [value, setValue] = useState([...initialValue]);

  const push = useCallback((item: T) => {
    setValue([...value, item]);
  }, []);

  const removeByIndex = useCallback((index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);
  }, []);

  return { value, push, removeByIndex };
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  const { value } = useArray([1, 2, 3]);
  return <div>{value}</div>;
}
