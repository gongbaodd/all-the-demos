
import './App.css'
import { XRCanvas, Hands, Controllers, Grabbable } from "@coconut-xr/natuerlich/defaults"
import { ImmersiveSessionOrigin, NonImmersiveCamera, useEnterXR } from '@coconut-xr/natuerlich/react';
import { RootContainer } from "@coconut-xr/koestlich"

const cssStyle = {
  touchAction: "none",
  overscrollBehavior: "none",
  userSelect: "none",
  position: "absolute",
  inset: 0
} as const;

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"]
} as const;

function App() {


  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const enterVR = useEnterXR("immersive-vr", sessionOptions);

  return (
    <>
      <XRCanvas style={cssStyle}>
        <color attach="background" args={[0]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 2]} />
        <NonImmersiveCamera position={[0, 1.5, -0.1]} />
        <ImmersiveSessionOrigin>
          <Hands />
          <Controllers />
        </ImmersiveSessionOrigin>

        <Grabbable position={[0, 1.5, -0.5]}>
          <RootContainer
            flexDirection='column'
            padding={8}
            borderRadius={8}
            pixelSize={.001}
            precision={1}
          >
            

          </RootContainer>
        </Grabbable>
      </XRCanvas>
      <button
        style={{
          padding: "1rem",
          position: "absolute",
          top: "1rem",
          left: "1rem"
        }}
        onClick={enterAR}
      >
        AR
      </button>
      <button
        style={{
          padding: "1rem",
          position: "absolute",
          top: "5rem",
          left: "1rem"
        }}
        onClick={enterVR}
      >
        VR
      </button>
    </>
  )
}

export default App
