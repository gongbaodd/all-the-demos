import { Vector3 } from "@babylonjs/core"
import { useMem } from "../../hooks/src/useMem"
import { animated, useSpring } from "../../spring/src"

export function WithColorSpring() {
  const mem = useMem()
  const colorProps = useSpring({
    from: {
      color: [0, 0, 1, 1]
    },
    to: async next => {
      while (true) {
        await next({ color: [0, 1, 0, 1] })
        await next({ color: [1, 0, 0, 1] })
        await next({ color: [0, 1, 0, 1] })
        await next({ color: [0, 1, 1, 1] })
      }
    }
  })

  const groundProps = useSpring({
    color: [0, 1, 0, 1]
  })

  return (
    <>
      <freeCamera
        name="camera1"
        position={mem(new Vector3(0, 5, -10))}
        setTarget={mem([Vector3.Zero()])}
      />
      <animated.hemisphericLight
        name="light1"
        intensity={.7}
        direction={mem(Vector3.Up())}
      />
      <sphere
        name="sphere1"
        diameter={3}
        segments={16}
        position={mem(new Vector3(0, 1.5, 0))}
      >
        <animated.standardMaterial
          name="material1"
          diffuseColor={colorProps.color}
        />
      </sphere>
      <ground
        name="ground1"
        width={6}
        height={6}
        subdivisions={2}
      >
        <animated.standardMaterial
          name="ground-material"
          diffuseColor={groundProps.color}
        />
      </ground>
    </>
  )
}
