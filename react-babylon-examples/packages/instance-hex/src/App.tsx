import { useCallback, useEffect, useMemo, useState } from "react"
import { Engine, Scene } from "react-babylonjs"
import { useMem } from "../../hooks/src/useMem"
import { Color3, Color4, Mesh, Vector3 } from "@babylonjs/core"
import { defineHex, Grid, Orientation, rectangle } from "honeycomb-grid"

const GRID_WIDTH = 60
const GRID_HEIGHT = 40
const HOVER_COLOR = new Color4(0.8, 0.8, 0.8, 1)

export function App() {
  const mem = useMem()
  const grid = useMemo(() => getGrid(), [])
  const [hexMesh, setHexMesh] = useState<Mesh | null>(null)
  const hexRef = useCallback((node: Mesh) => {
    if (!node) return
    node.registerInstancedBuffer("color", 4)
    setHexMesh(node)
  }, [])

  return (
    <div className="App">
      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="sample-canvas"
      >
        <Scene clearColor={mem(Color4.FromColor3(Color3.White()))}>
          <arcRotateCamera
            name="arc"
            target={mem(Vector3.Zero())}
            minZ={0.001}
            alpha={-Math.PI / 2}
            beta={Math.PI / 2}
            radius={Math.max(GRID_WIDTH, GRID_HEIGHT) * 1.5}
            lowerRadiusLimit={Math.max(GRID_WIDTH, GRID_HEIGHT) * 1.3}
            upperRadiusLimit={Math.max(GRID_WIDTH, GRID_HEIGHT) * 2}
          />
          <hemisphericLight
            name="light1"
            intensity={0.9}
            direction={mem(Vector3.Down())}
          />
          <disc
            name="hex"
            radius={1}
            tessellation={6}
            isVisible={false}
            ref={hexRef}
          />
          {!!hexMesh && Array.from(grid).map((hex, i) => {
            const {x,y} = hex
            return <instancedMesh
              source={hexMesh}
              key={i}
              name={`hex-${x}-${y}`}
              position={mem(new Vector3(
                x + hex.width/2 - GRID_WIDTH *0.75,
                y + hex.height/2 - (Math.sqrt(3)*GRID_HEIGHT)/2,
                0
                ))
              }
              instancedBuffers={{
                color: mem(new Color4(Math.random(), Math.random(), Math.random(), 1))
              }}
            />
          })}
        </Scene>
      </Engine>
    </div>
  )
}

function getGrid() {
  const Hex = defineHex({
    dimensions: 1,
    orientation: Orientation.FLAT,
  })

  const grid = new Grid(Hex, rectangle({ width: GRID_WIDTH, height: GRID_HEIGHT }))

  return grid
}
