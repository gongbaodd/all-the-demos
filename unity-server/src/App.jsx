import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/build.loader.js",
    dataUrl: "Build/build.data.br",
    frameworkUrl: "Build/build.framework.js.br",
    codeUrl: "Build/build.wasm.br",
  });

  return <Unity unityProvider={unityProvider} />;
}

export default App;