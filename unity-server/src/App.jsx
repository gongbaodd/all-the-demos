import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const ref = React.useRef(null);
  const { unityProvider, takeScreenshot } = useUnityContext({
    loaderUrl: "Build/build.loader.js",
    dataUrl: "Build/build.data.br",
    frameworkUrl: "Build/build.framework.js.br",
    codeUrl: "Build/build.wasm.br",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  function handleClickTakeScreenshot() {
    const dataUrl = takeScreenshot("image/jpg", 1.0);

    const createEl = document.createElement('a');
    createEl.href = dataUrl;

    // This is the name of our downloaded file
    createEl.download = "download-this-canvas";

    // Click the download button, causing a download, and then remove it
    createEl.click();
    createEl.remove();
  }

  return (
    <>
      <Unity
        unityProvider={unityProvider}
        style={{ width: 800, height: 600 }}
        ref={ref}
      />
      ;<button onClick={handleClickTakeScreenshot}>Take Screenshot</button>
    </>
  );
}

export default App;
