// This is a React Quiz from BFE.dev

import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  console.log("App");
  const [state, setState] = useState(0);
  useEffect(() => {
    setState((state) => state + 1);
  }, []);

  useEffect(() => {
    console.log("useEffect 1");
    return () => {
      console.log("useEffect 1 cleanup");
    };
  }, [state]);

  useEffect(() => {
    console.log("useEffect 2");
    return () => {
      console.log("useEffect 2 cleanup");
    };
  }, [state]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    return () => {
      console.log("useLayoutEffect cleanup");
    };
  }, [state]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

/**
"App" // Initial rendering cycle doesn't run any clean up.
"useLayoutEffect"
"useEffect 1"
"useEffect 2"
"App" // Re-render
"useLayoutEffect cleanup" // useLayoutEffect is first to be cleaned up and immediately executed.
"useLayoutEffect"
"useEffect 1 cleanup" // Regular useEffects are grouped, cleaned up and then executed for the second rendering cycle.
"useEffect 2 cleanup"
"useEffect 1"
"useEffect 2"

 */
