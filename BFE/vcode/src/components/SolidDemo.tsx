import { createSignal, createEffect } from "solid-js";
import { Button } from "@suid/material";

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <Button onClick={() => setCount(count() + 1)}>Click Me {count()}</Button>
  );
}

export default Counter;
