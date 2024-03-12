
import './App.css'
import { XRCanvas, Hands, Controllers, Grabbable } from "@coconut-xr/natuerlich/defaults"
import { ImmersiveSessionOrigin, NonImmersiveCamera, useEnterXR } from '@coconut-xr/natuerlich/react';
import { Card } from './components/card';
import { Container, Text, Root } from '@react-three/uikit';
import { Tabs, TabsButton } from './components/tabs';
import { useState } from 'react';
import { ButtonsOnCard } from './pages/button';
import { TextOnCard } from './pages/card';
import { CheckboxOnCard } from './pages/checkbox';
import { ListsOnCard } from './pages/list';
import { LoadingSpinnersOnCard } from './pages/loading';
import { ProgressBarsOnCard } from './pages/progress';
import { SlidersOnCard } from './pages/slider';
import { TabBarWithText } from './pages/tab-bar';
import { TabsOnCard } from './pages/tabs';

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

const componentPages = {
  button: ButtonsOnCard,
  card: TextOnCard,
  checkbox: CheckboxOnCard,
  list: ListsOnCard,
  loading: LoadingSpinnersOnCard,
  progress: ProgressBarsOnCard,
  slider: SlidersOnCard,
  'tab-bar': TabBarWithText,
  tabs: TabsOnCard,
}
const defaultComponent = 'button'

function App() {
  const [component, set] = useState<keyof typeof componentPages>(() => {
    const params = new URLSearchParams(window.location.search)
    let selected = params.get('component')
    if (selected == null || !(selected in componentPages)) {
      selected = defaultComponent
    }
    return selected as keyof typeof componentPages
  })
  const setComponent = (value: keyof typeof componentPages) => {
    const params = new URLSearchParams(window.location.search)
    params.set('component', value)
    history.replaceState(null, '', '?' + params.toString())
    set(value)
  }


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
          <Root
            flexDirection='column'
            padding={8}
            borderRadius={8}
            pixelSize={.001}
            precision={1}
          >
          <Card borderRadius={32} gap={32} paddingX={16}>
            <Container flexDirection="row" maxWidth="100%" overflow="scroll" paddingY={16}>
              <Tabs value={component} onValueChange={setComponent}>
                {Object.keys(componentPages).map((name) => (
                  <TabsButton value={name} key={name}>
                    <Text>
                      {name[0].toUpperCase()}
                      {name.slice(1)}
                    </Text>
                  </TabsButton>
                ))}
              </Tabs>
            </Container>
          </Card>

          </Root>
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
