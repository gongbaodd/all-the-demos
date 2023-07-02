import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Color4 } from "@babylonjs/core";
import { DynamicTerrain } from "./DynamicTerrain";

export function App() {
  const mem = useMem()
  return (
    <div style={{flex: 1, display: "flex"}}>
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene clearColor={mem(new Color4(.2, .4, .75, 1.0))}>
          <DynamicTerrain />
        </Scene>
      </Engine>
    </div>
  )
}
