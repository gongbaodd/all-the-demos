import { EffectCallback, useEffect } from "react";

export function useEffectOnce(effect: EffectCallback) {
  // your code here

  useEffect(effect, []);
}

// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }
