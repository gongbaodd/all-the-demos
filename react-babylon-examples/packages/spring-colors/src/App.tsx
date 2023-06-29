import { Engine, Scene } from "react-babylonjs";
import { WithColorSpring } from "./WithColorSpring";

export function App() {
  return (
    <div style={{ flex: 1, display: 'flex' }}>
      <Engine antialias adaptToDeviceRatio canvasId="sample-canvas">
        <Scene>
          <WithColorSpring />
        </Scene>
      </Engine>
    </div>
  )
}
