import { Color3, Vector3 } from "@babylonjs/core";
import { useMemo, useReducer, useRef } from "react";
import { Engine, Scene, useClick } from "react-babylonjs";

export function App() {
  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="sample-canvas"
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
        <WithClick />
        <ground
          name="ground1"
          width={6}
          height={6}
          subdivisions={2}
        />
      </Scene>
    </Engine>
  )
}

const COLORS = ['#4F86EC', '#D9503F', '#F2BD42', '#58A55C'];

function *getColor() {
  let i = 0;
  while (true) {
    i++
    yield COLORS[i % COLORS.length];
  }
}

export function WithClick() {
  const colorGen = useMemo(() => getColor(), [])
  const [color, nextColor] = useReducer((state) => {
    return Color3.FromHexString(colorGen.next().value!)
  }, Color3.FromHexString(COLORS[0]))

  const [ref] = useClick(() => {
    nextColor()
  })

  return (
    <sphere
      name="sphere1"
      diameter={2}
      segments={16}
      position={new Vector3(0, 1, 0)}
      ref={ref}
    >
      <standardMaterial
        name="material1"
        diffuseColor={color}
      />
    </sphere>
  )
}
