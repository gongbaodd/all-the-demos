import { AbstractMesh, Color3, Mesh, Nullable, Vector3 } from "@babylonjs/core"
import { useEffect, useMemo, useRef, useState } from "react"
import { useBeforeRender, useEngine, useHover } from "react-babylonjs"

type RotationProps = {
  name: string
  rpm: number
  position: Vector3
  rotationAxis: 'x' | 'y' | 'z'
  color: Color3
  hoveredColor: Color3
}

function RotatingBox({ rpm, position, rotationAxis, color, hoveredColor, name }: RotationProps) {
  const [axis, setAxis] = useState(0)
  const engine = useEngine()
  const rotation = useMemo(() => {
    const r = new Vector3(0,0,0)
    r[rotationAxis] = axis
    return r
  }, [rotationAxis, axis])
  const boxRef = useRef<Nullable<Mesh>>(null)

  const [hovered, setHovered] = useState(false)

  useHover(
    () => setHovered(true),
    () => setHovered(false),
    boxRef
  )

  useBeforeRender(() => {
    if (!engine) return

    const delta = engine.getDeltaTime() / 1000

    setAxis(_axis => {
      return _axis + (rpm / 60) * Math.PI * 2 * delta
    })
  },
  undefined,
  undefined,
  undefined,
  [engine, rpm, setAxis])

  return <box
    name={name}
    size={2}
    position={position}
    rotation={rotation}
    ref={boxRef}
  >
    <standardMaterial
      name={name + "material"}
      diffuseColor={hovered ? hoveredColor : color}
      specularColor={Color3.Black()}
    />
  </box>
}

export { RotatingBox }
