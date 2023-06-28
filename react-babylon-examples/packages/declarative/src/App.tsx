import { Color3, Vector3 } from "@babylonjs/core"
import { Engine, Scene } from "react-babylonjs"
import { RotatingBox } from "./RotatingBox"
import { ChangeEventHandler, useCallback, useMemo, useState } from "react"

function App() {
  const [rpm, setRPM] = useState(10)
  const onChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    ({ target }) => {
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
            receiveShadows
          />
          <directionalLight
            name="dl"
            intensity={.6}
            direction={useMemo(() => new Vector3(-5 * Math.PI / 4, -5 * Math.PI / 4, -Math.PI), [])}
            position={useMemo(() => new Vector3(0, 4, 16), [])}
          >
            <shadowGenerator
              mapSize={1024}
              useBlurExponentialShadowMap
              blurKernel={64}
              shadowCastChildren
            >
              <RotatingBox
                name="box1"
                rpm={rpm}
                position={useMemo(() => new Vector3(-2, 1, 0), [])}
                color={useMemo(() => Color3.Red(), [])}
                hoveredColor={useMemo(() => Color3.Blue(), [])}
                rotationAxis="y"
              />
              <RotatingBox
                name="box2"
                rpm={rpm}
                position={useMemo(() => new Vector3(2, 1, 0), [])}
                rotationAxis="x"
                color={useMemo(() => Color3.Green(), [])}
                hoveredColor={useMemo(() => Color3.Yellow(), [])}
              />
            </shadowGenerator>
          </directionalLight>
        </Scene>
      </Engine>
    </div>
  </>
}

export default App
