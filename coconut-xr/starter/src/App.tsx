import { Controllers, Grabbable, Hands, XRCanvas } from '@coconut-xr/natuerlich/defaults'
import './App.css'
import { ImmersiveSessionOrigin, NonImmersiveCamera, useEnterXR } from '@coconut-xr/natuerlich/react';
import { Container, DefaultStyleProvider, RootContainer, Text } from "@coconut-xr/koestlich"
import { Glass, IconButton } from '@coconut-xr/apfel-kruemel';
import { Play, Rewind, FastForward } from "@coconut-xr/lucide-koestlich"


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
            <Glass padding={10} borderRadius={20}>
              <DefaultStyleProvider color="white">
                <Text index={1} marginTop={8}>
                  Ink of Infinity
                </Text>
                <Text index={2} opacity={0.5}>
                  Quasar Quill
                </Text>
                <Container
                  index={3}
                  marginTop={16}
                  width="100%"
                  flexDirection="row"
                  justifyContent="space-evenly"
                >
                  <IconButton>
                    <Rewind height={16} width={16} />
                  </IconButton>
                  <IconButton>
                    <Play height={16} width={16} />
                  </IconButton>
                  <IconButton>
                    <FastForward height={16} width={16} />
                  </IconButton>
                </Container>
              </DefaultStyleProvider>

            </Glass>
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
