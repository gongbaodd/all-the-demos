// This is a React Quiz from BFE.dev

import React, { Suspense } from "react";
import ReactDOM from "react-dom";

const resource = (() => {
  let data = null;
  let status = "pending";
  let fetcher = null;
  return {
    get() {
      if (status === "ready") {
        return data;
      }
      if (status === "pending") {
        fetcher = new Promise((resolve, reject) => {
          setTimeout(() => {
            data = 1;
            status = "ready";
            resolve();
          }, 100);
        });
        status = "fetching";
      }

      throw fetcher;
    },
  };
})();

function A() {
  console.log("A1");
  const data = resource.get();
  console.log("A2");
  return <p>{data}</p>;
}

function Fallback() {
  console.log("fallback");
  return null;
}

function App() {
  console.log("App");
  return (
    <div>
      <Suspense fallback={<Fallback />}>
        <A />
      </Suspense>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

/**
"App"
"A1"
"fallback"
"A1"
"A2"

 */
