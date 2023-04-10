import { useReducer } from "react";

export function useToggle(on: boolean): [boolean, () => void] {
  const [onState, toggle] = useReducer((state) => !state, on);

  return [onState, toggle];
}

// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }
