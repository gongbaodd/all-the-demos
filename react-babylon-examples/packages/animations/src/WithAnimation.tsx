import { TransformNode, Vector3, Animation, Scene } from "@babylonjs/core"
import { useEffect, useRef, useState } from "react"
import { useMem } from "../../hooks/src/useMem"
import { useScene } from "react-babylonjs"
import anime from "animejs"

export function WithAnimation() {
  const scene = useScene()
  const groundRef = useRef<TransformNode>(null)
  const mem = useMem()
  const spheres = getSpheres(10, mem)

  // useEffect(() => {
  //   playAnimation(groundRef.current, scene)
  // }, [scene, groundRef])

  const [pos, setPos] = useState(Vector3.Zero())

  useEffect(() => {
    if (!groundRef.current) return
    const targets = {
      position: 0
    };
    anime({
      targets,
      position: 2,
      easing: "linear",
      update: () => {
        setPos(new Vector3(0, targets.position, 0))
      }
    })
  }, [groundRef])

  return (
    <transformNode
      name="ground"
      ref={groundRef}
      position={pos}
    >
      {spheres}
    </transformNode>
  )
}

function playAnimation(ground: TransformNode | null, scene: Scene | null) {
  if (!ground || !scene) return
  const animations = getSlideUpAnimation(ground.position, -2)
  scene.beginDirectAnimation(ground, animations, 0, 120, true)
}

function getSlideUpAnimation(position: Vector3, offsetY: number) {
  const { y } = position
  const keys = [
    { frame: 0, value: y + offsetY },
    { frame: 60, value: y },
    { frame: 120, value: y + offsetY },
  ]
  const animation = new Animation("slide-up", "position.y", 60, 0, 1)
  animation.setKeys(keys)
  return [animation]
}

function getSpheres(count: number, mem: ReturnType<typeof useMem>) {
  const results = []

  for (let i = -count / 2; i < count / 2; i++) {
    for (let j = -count / 2; j < count / 2; j++) {
      const key = `sphere-${i}-${j}`
      results.push(
        <sphere
          name={key}
          key={key}
          diameter={0.5}
          segments={16}
          position={mem(new Vector3(i, 0.25, j))}
        />
      )
    }
  }

  return results
}
