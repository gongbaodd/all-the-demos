import { Engine, Scene, createPortal, useBeforeRender, useEngine } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Color3, Mesh, TransformNode, Vector3 } from "@babylonjs/core";
import { useMemo, useState } from "react";
import { Inspector } from "../../inspector/src";

const rpm = 5

export function App() {
  const mem = useMem()

  return (
    <div style={{ flex: 1, display: 'flex' }}>
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

          <Portal />
        </Scene>
      </Engine>
    </div>
  )
}

export function Portal() {
  const [mesh, setMesh] = useState<TransformNode | null>()
  const mem = useMem()
  const engine = useEngine()

  useBeforeRender(() => {
    if (!mesh || !engine) return
    const delta = engine.getDeltaTime()
    mesh.rotation.y += delta / 1000 * rpm / 60 * Math.PI * 2
  }, undefined, undefined, undefined, [mesh, engine])

  const portal = useMemo(() => {
    if (!mesh) return null
    return createPortal(
      <box
        name="portal-box"
        position={mem(new Vector3(0, 1, 0))}
      >
        <standardMaterial
          name="mat"
          diffuseColor={mem(Color3.Blue())}
          specularColor={mem(Color3.Black())}
        />
      </box>,
      mesh
    )
  }, [mesh])


  return (
    <>
      {portal}
      <transformNode
        name="transform-node"
        ref={setMesh}
      >
        <ground
          name="ground1"
          width={6}
          height={6}
          subdivisions={2}
          position={mem(new Vector3(0, 0, 0))}
        />
      </transformNode>
    </>
  )
}
