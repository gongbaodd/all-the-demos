import { Vector3 } from "@babylonjs/core"
import { Engine, Scene } from "react-babylonjs"
import { RotatingBox } from "./RotatingBox"
import { ChangeEventHandler, useCallback, useState } from "react"

function App() {
  const [rpm, setRPM] = useState(10)
  const onChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    ({target}) => {
      setRPM(Number(target.value))
    },
  [])

  return <>
  <label>
    Select RPM:
    <select onChange={onChange} defaultValue={rpm}>
      {[5, 10, 60].map(v =>
        <option key={v} value={v}>{v}</option>
      )}
    </select>
  </label>
  <div style={{ flex: 1, display: "flex" }}>
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="declarative-canvas"
      renderOptions={{
        whenVisibleOnly: true,
      }}
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
          direction={new Vector3(0, 1, 0)}
        />
        <ground
          name="ground"
          width={6}
          height={6}
        />
        <RotatingBox rpm={rpm} />
      </Scene>
    </Engine>
  </div>
  </>
}

export default App
