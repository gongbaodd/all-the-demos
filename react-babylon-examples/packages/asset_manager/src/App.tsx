import { BinaryFileAssetTask, Color3, Color4, Mesh, Particle, PointsCloudSystem, Vector3 } from "@babylonjs/core";
import { Suspense, useEffect, useState } from "react";
import { Engine, Scene, Task, TaskType, useAssetManager } from "react-babylonjs";
import { Inspector } from "../../inspector/src";

export function App() {
  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="babylonJS"
    >
      <Scene>
        <arcRotateCamera
          name="camera1"
          alpha={Math.PI / 2}
          beta={Math.PI / 2}
          radius={20}
          target={Vector3.Zero()}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        {/* <Inspector /> */}
        <Suspense>
          <MyPCS />
        </Suspense>
      </Scene>
    </Engine>
  )
}

const pointCloudAssets: Task[] = [{
  taskType: TaskType.Binary,
  url: "../assets/kitti/000000.bin",
  name: "kitti",
}]

export function MyPCS() {
  const [pcs, setPCS] = useState<PointsCloudSystem|null>(null)
  const [mesh, setMesh] = useState<Mesh|null>(null)
  const result = useAssetManager(pointCloudAssets)
  useEffect(() => {
    if (!pcs) return

    const binary = result.tasks[0] as BinaryFileAssetTask
    const floats = new Float32Array(binary.data)
    const POINTS_PER_FLOAT = 4
    const numPoints = floats.length / POINTS_PER_FLOAT

    pcs.addPoints(numPoints, particalFunc)
    pcs.buildMeshAsync().then((mesh) => setMesh(mesh))

    function particalFunc(p: Particle, i: number, s: number) {
      const x = floats[i * POINTS_PER_FLOAT + 0]
      const y = floats[i * POINTS_PER_FLOAT + 1]
      const z = floats[i * POINTS_PER_FLOAT + 2]
      p.position = new Vector3(x, y, z)
      p.color = Color4.FromColor3(Color3.White())
    }
  }, [pcs])

  return (
    <pointsCloudSystem
      name="cloud"
      pointSize={2}
      ref={setPCS}
    >
      {mesh && (
        <mesh name="pcs" />
      )}
    </pointsCloudSystem>
  )
}
