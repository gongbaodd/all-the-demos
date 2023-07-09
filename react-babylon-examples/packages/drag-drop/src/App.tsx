import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Color3, Color4, Vector3 } from "@babylonjs/core";
import { useEffect, useState } from "react";
import { Inspector } from "../../inspector/src";

const GROUND_SIZE = 1000

export function App() {
  const mem = useMem()
  const [pointLightDiffuse, setPointLightDiffuse] = useState(new Color3(0, .5, .5))

  useEffect(() => {
    const changeLight = () => {
      setPointLightDiffuse(l => {
        const red = (l.r + .1) % 1
        return new Color3(red, l.g, l.b)
      })
    }

    const handle = setInterval(changeLight, 1000)

    return () => clearInterval(handle)
  }, [])

  return (
    <Engine
      antialias
      adaptToDeviceRatio
      engineOptions={{ preserveDrawingBuffer: true, stencil: true }}
      canvasId="sample-canvas"
    >
      <Scene clearColor={mem(new Color4(0, 0, 0))}>
        <pointLight
          name="Omni"
          position={mem(new Vector3(0, 50, 0))}
          diffuse={mem(pointLightDiffuse)}
        />
        <arcRotateCamera
          name="Camera"
          alpha={0} beta={0} radius={10}
          target={mem(new Vector3(0, 0, 0))}
          setPosition={mem([new Vector3(20, 200, 400)])}
          lowerBetaLimit={.1}
          upperBetaLimit={(Math.PI / 2) * 0.99}
          lowerRadiusLimit={150}
        />

        <ground
          name="ground1"
          width={GROUND_SIZE}
          height={GROUND_SIZE}
          subdivisions={1}
        >
          <standardMaterial
            name="groundMat"
            specularColor={mem(new Color3(0.1, 0.1, 0.1))}
          />
        </ground>

        <sphere
          name="red"
          diameter={20}
          segments={32}
          position={mem(new Vector3(-100, 10, 0))}
        >
          <standardMaterial
            name="redMat"
            diffuseColor={mem(new Color3(.4, .4, .4))}
            specularColor={mem(new Color3(.4, .4, .4))}
            emissiveColor={mem(Color3.Red())}
          />
          <pointerDragBehavior
            dragPlaneNormal={mem(new Vector3(0, 1, 0))}
            validateDrag={validateDrag}
          />
        </sphere>

        <box
          name="green"
          size={20}
          position={mem(new Vector3(0, 11, -100))}
        >
          <standardMaterial
            name="greenMat"
            diffuseColor={mem(new Color3(.4, .4, .4))}
            specularColor={mem(new Color3(.4, .4, .4))}
            emissiveColor={mem(Color3.Green())}
          />

          <pointerDragBehavior
            dragPlaneNormal={mem(new Vector3(0, 1, 0))}
            validateDrag={validateDrag}
          />
        </box>

        <box
          name="blue"
          size={20}
          position={mem(new Vector3(100, 10, 0))}
        >
          <standardMaterial
            name="blueMat"
            diffuseColor={mem(new Color3(.4, .4, .4))}
            specularColor={mem(new Color3(.4, .4, .4))}
            emissiveColor={mem(Color3.Blue())}
          />

          <pointerDragBehavior
            dragPlaneNormal={mem(new Vector3(0, 1, 0))}
            validateDrag={validateDrag}
          />
        </box>

        <torus
          name="torus"
          diameter={30}
          thickness={10}
          tessellation={32}
          position={mem(new Vector3(0, 10, 100))}
        >
          <standardMaterial
            name="torusMat"
            diffuseColor={mem(new Color3(.4, .4, .4))}
            specularColor={mem(new Color3(.4, .4, .4))}
            emissiveColor={mem(Color3.Purple())}
          />

          <pointerDragBehavior
            dragPlaneNormal={mem(new Vector3(0, 1, 0))}
            validateDrag={validateDrag}
          />
        </torus>


      </Scene>
    </Engine>
  )
}

function validateDrag(pos: Vector3) {
  return (
    Math.max(
      Math.abs(pos.x),
      Math.abs(pos.z),
    ) <=
    (GROUND_SIZE / 2 - 10)
  )
}
