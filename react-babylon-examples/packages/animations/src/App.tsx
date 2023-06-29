import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Vector3 } from "@babylonjs/core";

export function App() {
  const mem = useMem()

  return <div style={{flex: 1, display: "flex"}}>
    <h1>Animations</h1>
    <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
      <Scene>
        <freeCamera
          name="camera1"
          position={mem(new Vector3(0, 10, -20))}
          setTarget={mem([Vector3.Zero()])}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={mem(Vector3.Up())}
        />
      </Scene>
    </Engine>
  </div>
}
