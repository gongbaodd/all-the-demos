import { Vector3 } from "@babylonjs/core";
import { Engine, Html, Scene } from "react-babylonjs";

export function App() {
  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="babylonJS"
    >
      <Scene>
        <freeCamera
          name="camera1"
          position={new Vector3(0, 5, -10)}
          setTarget={[Vector3.Zero()]}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <WithHTML />
      </Scene>
    </Engine>
  )
}


export function WithHTML() {
  return (
    <transformNode
      name="transform"
      position={new Vector3(0, 0, 0)}
      rotation={new Vector3(0, Math.PI, 0)}
    >
      <sphere
        name="sphere1"
        diameter={2}
        segments={16}
        position={new Vector3(2, 0, 0)}
      >
        <Html name="html" center>
          <div>
            Text
          </div>
        </Html>
      </sphere>
    </transformNode>
  )
}
