import { Engine, Scene, useScene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { ArcRotateCamera, Color4, Vector3 } from "@babylonjs/core";
import { useCallback } from "react";
import { BoxWithArrows } from "../../engine-view/src/App";
import { Inspector } from "../../inspector/src";

export function App() {
  const mem = useMem()

  return (
    <div style={{ flex: 1, display: 'flex' }}>
      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="sample-canvas"
      >
        <Scene clearColor={mem(new Color4(.5, .5, .5))}>
          <MultiViewport />
          <Inspector />
        </Scene>
      </Engine>
    </div>
  )
}

export function MultiViewport() {
  const mem = useMem()
  const scene = useScene()
  const onCameraCreated = useCallback((camera: ArcRotateCamera) => {
    if (!scene) return
    scene.activeCameras = [...(scene.activeCameras ?? []), camera]
  }, [scene])

  return (
    <>
      <BoxWithArrows
        position={mem(new Vector3(0, 0, 0))}
      />

      <hemisphericLight
        name="light1"
        intensity={0.7}
        direction={mem(Vector3.Up())}
      />

      <arcRotateCamera
        name="camera1"
        alpha={3 * Math.PI / 8}
        beta={3 * Math.PI / 8}
        radius={15}
        target={mem(new Vector3(0, 2, 0))}
        onCreated={onCameraCreated}
      >
        <viewport
          x={0}
          y={0}
          width={.5}
          height={1}
        />
      </arcRotateCamera>

      <arcRotateCamera
        name="camera2"
        alpha={5 * Math.PI / 8}
        beta={5 * Math.PI / 8}
        radius={30}
        target={mem(new Vector3(0, 2, 0))}
        onCreated={onCameraCreated}
      >
        <viewport
          x={.5}
          y={0}
          width={.5}
          height={1}
        />
      </arcRotateCamera>
    </>
  )
}
