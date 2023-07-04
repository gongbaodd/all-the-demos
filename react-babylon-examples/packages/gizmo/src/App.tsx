import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Color3, Vector3 } from "@babylonjs/core";

export function App() {
  const mem = useMem()

  return (
    <div style={{flex: 1, display: "flex"}}>
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
          <utilityLayerRenderer>
            <GizmoBox
              color={mem(Color3.Red())}
              position={mem(new Vector3(-2.1, 0, 0))}
            />
            <GizmoBox
              color={mem(Color3.Yellow())}
              position={mem(new Vector3(1.9, 0, 0))}
            />
          </utilityLayerRenderer>
        </Scene>
      </Engine>
    </div>
  )
}

export function GizmoBox(props: {
  position: Vector3
  color: Color3
}) {
  return (
    <box
      name="gizmo-box"
      size={2}
      position={props.position}
    >
      <standardMaterial
        name="gizmo-box-mat"
        diffuseColor={props.color}
        specularColor={Color3.Black()}
      />
      <positionGizmo />
    </box>
  )
}
