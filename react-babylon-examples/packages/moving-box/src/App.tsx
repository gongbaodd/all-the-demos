import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Color3, Vector3 } from "@babylonjs/core";
import { MovingBox } from "./MovingBox"

export function App() {
  const mem = useMem()

  return (
    <div style={{ flex: 1, display: "flex" }}>
      <Engine antialias adaptToDeviceRatio canvasId="babylon-scene">
        <Scene>
          <freeCamera
            name="camera1"
            position={mem(new Vector3(0, 5, -10))}
            setTarget={mem([Vector3.Zero()])}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={mem(Vector3.Up())}
          />
          <MovingBox
            color={mem(Color3.Red())}
            position={mem(new Vector3(-1.8, 0, 0))}
            positionAxis="y"
          />
          <MovingBox
            color={mem(Color3.Yellow())}
            position={mem(new Vector3(2.2, 0, 0))}
            positionAxis="x"
          />
        </Scene>
      </Engine>
    </div>
  );
}
