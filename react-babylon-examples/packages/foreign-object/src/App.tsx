import { Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";
import Template from "./Template";

export function App() {
  return (
    <div>

      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="sample-canvas"
      >
        <Scene>
          <arcRotateCamera
            name="camera1"
            alpha={Math.PI / 2}
            beta={Math.PI / 4}
            radius={5}
            target={Vector3.Zero()}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
          />
          <plane
            name="plane1"
            height={3}
            width={3}
            rotation={new Vector3(Math.PI / 2, 0, 0)}
          >
            <standardMaterial
              name="plane1-material"
            />
          </plane>
        </Scene>
      </Engine>
      <Template />
    </div>
  )
}
