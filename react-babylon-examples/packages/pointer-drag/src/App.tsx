import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Vector3 } from "@babylonjs/core";

export function App() {
  const mem = useMem()
  return (
    <div style={{flex: 1, display: 'flex'}}>
      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="sample-canvas"
      >
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
          <sphere
            name="sphere1"
            diameter={2}
            segments={16}
            position={mem(new Vector3(0, 1, 0))}
          >
            <pointerDragBehavior
              dragAxis={mem(new Vector3(1, 0, 1))}
              useObjectOrientationForDragging={true}
              onDragStartObservable={() => {}}
            />
          </sphere>
          <ground
            name="ground1"
            width={6}
            height={6}
            subdivisions={2}
          />
        </Scene>
      </Engine>
    </div>
  )
}
