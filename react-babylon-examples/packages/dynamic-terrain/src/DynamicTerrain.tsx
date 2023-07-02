import { Color3, Vector3 } from "@babylonjs/core"
import { useMem } from "../../hooks/src/useMem"

const X_SIZE = 500
const Z_SIZE = 500
const SUB_SIZE = 100
const { MAP_DATA } = {
  get MAP_DATA() {
    const mapData = new Float32Array(X_SIZE * Z_SIZE * 3)

    for (let l = 0; l < Z_SIZE; l++) {
      for (let w = 0; w < X_SIZE; w++) {
        mapData[3 * (l * X_SIZE + w)] = (w - X_SIZE / 2) * 2.0
        mapData[3 * (l * X_SIZE + w) + 1] =
          (w / (l + 1)) * Math.sin((l + 1) / 2) * Math.cos(w / 2) * 2.0
        mapData[3 * (l * X_SIZE + w) + 2] = (l - Z_SIZE / 2) * 2.0
      }
    }

    return mapData
  }
}

export function DynamicTerrain() {
  const mem = useMem()

  return (
    <>
      <hemisphericLight
        name="light1"
        intensity={0.7}
        direction={mem(Vector3.Up())}
      />
      <freeCamera
        name="camera1"
        position={mem(new Vector3(-50, 10, 0))}
        setTarget={mem([new Vector3(-20, 0, 0)])}
      />
      <dynamicTerrain
        name="terrain"
        mapSubX={X_SIZE}
        mapSubZ={Z_SIZE}
        mapData={MAP_DATA}
        terrainSub={SUB_SIZE}
      >
        <standardMaterial
          name="terrain-material"
          diffuseColor={mem(Color3.Green())}
          assignTo="mesh.material"
          wireframe={true}
        />
      </dynamicTerrain>
    </>
  )
}
