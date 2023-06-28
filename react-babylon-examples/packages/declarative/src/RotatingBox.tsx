import { Vector3 } from "@babylonjs/core"
import { useState } from "react"
import { useBeforeRender, useEngine } from "react-babylonjs"

type RotationProps = {
  rpm: number
}

function RotatingBox({ rpm }: RotationProps) {
  const [y, setY] = useState(0)
  const engine = useEngine()

  useBeforeRender(() => {
    if (!engine) return

    const delta = engine.getDeltaTime() / 1000

    setY(_y => {
      return _y + (rpm / 60) * Math.PI * 2 * delta
    })
  },
  undefined,
  undefined,
  undefined,
  [engine, rpm])

  return <box
    name="box"
    size={2}
    position={new Vector3(0, 1, 0)}
    rotation={new Vector3(0, y, 0)}
  />
}

export { RotatingBox }
