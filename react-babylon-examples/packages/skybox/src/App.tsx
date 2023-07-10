import { Vector3 } from "@babylonjs/core";
import { Engine, Scene, Skybox } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { useCallback, useState } from "react";

const SKYBOX_SCENES = [
  "../assets/TropicalSunnyDay",
  "../assets/SpecularHDR.dds",
]

export function App() {
  const mem = useMem()
  const [skeyboxIndex, setIndex] = useState(0)

  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="sample-canvas"
    >
      <Scene>
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={mem(Vector3.Up())}
        />
        <arcRotateCamera
          name="arc-cam"
          target={mem(Vector3.Zero())}
          radius={10}
          alpha={-Math.PI/2}
          beta={Math.PI/2}
          minZ={.001}
          wheelPrecision={50}
        />
        <Skybox
          rootUrl={SKYBOX_SCENES[skeyboxIndex]}
        />
        <gui3DManager>
          <cylinderPanel
            name="panel"
            margin={0.2}
          >
            {[...Array(50)].map((_, index) => {
              return (
                <holographicButton
                  key={"btn-" + index}
                  name={"btn-" + index}
                  text={"Button " + index}
                  onPointerClickObservable={() => {
                    setIndex((skeyboxIndex + 1) % SKYBOX_SCENES.length)
                  }}
                />
              )
            })}
          </cylinderPanel>
        </gui3DManager>
      </Scene>
    </Engine>
  )
}
