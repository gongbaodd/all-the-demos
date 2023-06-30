import { useCallback, useState } from "react"
import { Engine, Scene } from "react-babylonjs"
import { useMem } from "../../hooks/src/useMem"
import { Vector3 } from "@babylonjs/core"
import { CustomMesh } from "./CustomMesh"

export function App() {
  const mem = useMem()
  const [display, setDisplay] = useState(false)
  const toggleDisplay = useCallback(() => {
    setDisplay((display) => !display)
  }, [setDisplay])

  return (
    <>
      <div>
        <button
          onClick={toggleDisplay}
        >
          Toggle Top Triangle Visibility
        </button>
      </div>
      <div style={{flex: 1, display: "flex"}}>
        <Engine antialias adaptToDeviceRatio canvasId="babylon">
          <Scene>
            <arcRotateCamera
              name="camera1"
              target={mem(Vector3.Zero())}
              alpha={Math.PI / 2}
              beta={Math.PI / 2}
              radius={20}
              lowerRadiusLimit={15}
              upperRadiusLimit={30}
            />
            <hemisphericLight
              name="light1"
              intensity={0.7}
              direction={mem(Vector3.Up())}
            />
            <CustomMesh
              name="custom-0"
              position={mem(new Vector3(0, 0, 0))}
              useWireFrame={false}
            />
            <CustomMesh
              name="custom-1"
              position={mem(new Vector3(0, 2, 0))}
              useWireFrame={true}
            />
            {display && (
              <CustomMesh
                name="custom-4"
                position={mem(new Vector3(0, 4, 0))}
                useWireFrame={true}
              />
            )}
          </Scene>
        </Engine>
      </div>
    </>
  )
}
