import { Mesh, Vector3 } from "@babylonjs/core";
import { Control, Rectangle, TextWrapping } from "@babylonjs/gui";
import { MutableRefObject, useState } from "react";
import { ADTFullscreenUI, Engine, Scene, useHover } from "react-babylonjs";

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
        <Gui/>
        <WithHover />
        <ground
          name="ground1"
          width={6}
          height={6}
          subdivisions={2}
        />
      </Scene>
    </Engine>
  );
}

export function WithHover() {
  const [scaling, setScaling] = useState(new Vector3(1, 1, 1));
  const [ref] = useHover(() => {
    setScaling(new Vector3(1.5, 1.5, 1.5))
  }, () => {
    setScaling(new Vector3(1, 1, 1))
  }) as MutableRefObject<Mesh>[]

  return (
    <sphere
      ref={ref}
      name="sphere1"
      diameter={2}
      segments={16}
      scaling={scaling}
      position={new Vector3(0, 1, 0)}
    />
  )
}

export function Gui() {
  const [color, setColor] = useState("white");
  const [isHovered, setHovered] = useState(false);
  const [ref] = useHover(() => {
    setColor("yellow")
    setHovered(true)
  }, () => {
    setColor("white")
    setHovered(false)
  })

  return (
    <adtFullscreenUi name="ui">
      <stackPanel verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}>
        <rectangle
          name="rect1"
          height="50px"
          width="150px"
          background={color}
          ref={ref as MutableRefObject<Rectangle>}
        >
          <textBlock
            text={isHovered ? "hovered": "not\nhovered"}
            fontStyle="bold"
            fontSize={20}
            color="black"
            textWrapping={TextWrapping.WordWrap}
          />
        </rectangle>
      </stackPanel>
    </adtFullscreenUi>
  )
}
