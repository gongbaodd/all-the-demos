import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Color4, Mesh, Vector3 } from "@babylonjs/core";

export function App() {
  const mem = useMem()
  return (
    <div style={{ flex: 1, display: "flex" }}>
      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="sample-canvas"
      >
        <Scene>
          <arcRotateCamera
            name="camera1"
            alpha={0}
            beta={Math.PI / 3}
            radius={10}
            target={mem(Vector3.Zero())}
          />
          <hemisphericLight
            name="light1"
            direction={mem(Vector3.Up())}
          />
          <box
            name="box1"
            edgesWidth={4}
            size={2}
            position={mem(new Vector3(0, 1.02, 0))}
            edgesColor={mem(new Color4(0, 0, 1, 1))}
            onCreated={meshCreated}
          />
          <ground
            name="ground1"
            width={6}
            height={6}
            edgesWidth={3}
            subdivisions={1}
            onCreated={meshCreated}
          />
        </Scene>
      </Engine>
    </div>
  )
}

function meshCreated(mesh: Mesh) {
  mesh.enableEdgesRendering()
}
