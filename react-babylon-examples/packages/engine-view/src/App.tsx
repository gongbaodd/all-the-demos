import { Engine, Scene, useEngine } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Color3, FreeCamera, Vector3 } from "@babylonjs/core";
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";

export function App() {
  const mem = useMem()
  const [canvas, setCanvas] = useState<HTMLCanvasElement | undefined>(undefined)
  const canvasRef = useCallback((canvas: HTMLCanvasElement) => setCanvas(canvas), [])

  return (
    <div className="container">
      <div className="row">
        <h1>First Canvas</h1>
      </div>
      <div className="row">
        <Engine
          antialias
          adaptToDeviceRatio
          canvasId="sample-canvas"
        >
          <Scene
            clearColor={mem(new Color3(.5, .5, .5).toColor4())}
          >
            <MultiCanvas canvas={canvas} />
          </Scene>
        </Engine>
      </div>
      <div className="row">
        <h1>Second Canvas</h1>
      </div>
      <div className="row">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  )
}

export function BoxWithArrows(props: { position: Vector3 }) {
  const mem = useMem()
  const size = 2
  const shade = 0

  return (
    <transformNode
      name="transformNode"
      position={props.position}
    >
      <lines
        name="red-line"
        points={mem([
          Vector3.Zero(),
          new Vector3(size, 0, 0),
          new Vector3(size * 0.95, 0.05 * size, 0),
          new Vector3(size, 0, 0),
          new Vector3(size * 0.95, -0.05 * size, 0),
        ])}
        color={mem(new Color3(1, shade, shade))}
      />
      <lines
        name="green-line"
        points={mem([
          Vector3.Zero(),
          new Vector3(0, size, 0),
          new Vector3(-0.05 * size, size * 0.95, 0),
          new Vector3(0, size, 0),
          new Vector3(0.05 * size, size * 0.95, 0),
        ])}
        color={mem(new Color3(shade, 1, shade))}
      />
      <lines
        name="blue-line"
        points={mem([
          Vector3.Zero(),
          new Vector3(0, 0, size),
          new Vector3(0, -0.05 * size, size * 0.95),
          new Vector3(0, 0, size),
          new Vector3(0, 0.05 * size, size * 0.95),
        ])}
        color={mem(new Color3(shade, shade, 1))}
      />
      <box
        name="box"
        faceColors={mem([
          Color3.Blue().toColor4(),
          Color3.Red().toColor4(),
          Color3.Green().toColor4(),
          Color3.White().toColor4(),
          Color3.Yellow().toColor4(),
          Color3.Black().toColor4(),
        ])}
      />
    </transformNode>
  )
}


export function MultiCanvas(props: { canvas?: HTMLCanvasElement }) {
  const mem = useMem()
  const [freeCam, setFreeCam] = useState<FreeCamera | undefined>(undefined)
  const freeCameraRef = useCallback((cam: FreeCamera) => setFreeCam(cam), [])
  const engine = useEngine()

  useEffect(() => {
    if (!engine) return
    if (!props.canvas) return
    if (!freeCam) return

    engine.registerView(props.canvas, freeCam)

    return () => {
      props.canvas && engine.unRegisterView(props.canvas)
    }

  }, [engine, props.canvas, freeCam])

  if (!props.canvas) return null

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
      <freeCamera
        name="freeCamera"
        position={mem(new Vector3(0, 5, -10))}
        setTarget={mem([Vector3.Zero()])}
        setActiveOnSceneIfNoneActive={false}
        ref={freeCameraRef}
      />
      <arcRotateCamera
        name="camera1"
        alpha={(3 * Math.PI) / 8}
        beta={(3 * Math.PI) / 8}
        radius={15}
        target={mem(new Vector3(0, 2, 0))}
      />
    </>
  )
}
