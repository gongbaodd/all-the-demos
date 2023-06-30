import { Color3, Mesh, Vector3 } from "@babylonjs/core"
import { useEffect, useRef } from "react"
import { useMem } from "../../hooks/src/useMem"
import { useScene } from "react-babylonjs"

const rpm = 5

export function MovingBox(
  props: {
    position: Vector3
    color: Color3
    positionAxis: 'x' | 'y' | 'z'
  },
) {
  const boxRef = useRef<Mesh>(null)
  const mem = useMem()
  const scene = useScene()

  useEffect(() => {
    if (!scene) return
    if (!boxRef.current) return

    const onBeforeRender = () => {
      const delta = scene.getEngine().getDeltaTime() / 1000
      const box = boxRef.current!
      box.rotation[props.positionAxis] += (rpm/60) * Math.PI * 2 * delta
    }

    scene.registerBeforeRender(onBeforeRender)

    return () => {
      scene.unregisterBeforeRender(onBeforeRender)
    }

  }, [scene, boxRef.current])

  return (
    <box
      name="box"
      ref={boxRef}
      size={2}
      position={props.position}
    >
      <standardMaterial
        name="box-mat"
        diffuseColor={props.color}
        specularColor={mem(Color3.Black())}
      />
    </box>
  )
}
