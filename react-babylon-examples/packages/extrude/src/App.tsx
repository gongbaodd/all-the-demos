import { Engine, Scene, useScene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { CSG, Color3, Mesh, MeshBuilder, Vector3 } from "@babylonjs/core";
import * as Earcut from "earcut";
import { useCallback, useEffect, useState } from "react";
import { Inspector } from "../../inspector/src";

export function App() {
  const mem = useMem()

  return (
    <div style={{ flex: 1, display: 'flex' }}>
      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="sample-canvas"
      >
        <Scene>
          <Inspector/>
          <arcRotateCamera
            name="camera1"
            alpha={Math.PI / 4}
            beta={Math.PI / 4}
            radius={20}
            target={mem(Vector3.Zero())}
            minZ={0.001}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={mem(Vector3.Up())}
          />
          <Shapes />
        </Scene>
      </Engine>
    </div>
  )
}

//Polygon shape in XoZ plane
const starPath = [
  new Vector3(4, 0, -4),
  new Vector3(2, 0, 0),
  new Vector3(5, 0, 2),
  new Vector3(1, 0, 2),
  new Vector3(-5, 0, 5),
  new Vector3(-3, 0, 1),
  new Vector3(-4, 0, -4),
  new Vector3(-2, 0, -3),
  new Vector3(2, 0, -3),
]

//Holes in XoZ plane
const holes = [
  [
    new Vector3(1, 0, -1),
    new Vector3(1.5, 0, 0),
    new Vector3(1.4, 0, 1),
    new Vector3(0.5, 0, 1.5),
  ],
  [
    new Vector3(0, 0, -2),
    new Vector3(0.5, 0, -1),
    new Vector3(0.4, 0, 0),
    new Vector3(-1.5, 0, 0.5),
  ],
]


export function Shapes() {
  const scene = useScene()
  const mem = useMem()
  const [poly, setPoly] = useState<Mesh | null>(null)
  const [mesh, setMesh] = useState<Mesh | null>(null)
  const [sphere, setSphere] = useState<Mesh | null>(null)

  useEffect(() => {
    if (!scene || !poly || !sphere) return

    const csg = CSG.FromMesh(poly)
    const res = csg.subtract(CSG.FromMesh(sphere))
    const base = res.toMesh("base")
    setMesh(base)

    return () => { base.dispose() }
  }, [scene, poly, sphere])


  return (
    <>
      <extrudePolygon
        name="wall"
        depth={2}
        sideOrientation={Mesh.DOUBLESIDE}
        holes={holes}
        shape={starPath}
        earcutInjection={Earcut}
        ref={setPoly}

      >
        <standardMaterial
          name="starMaterial"
          diffuseColor={mem(Color3.Red())}
          specularColor={mem(Color3.Black())}
        />
      </extrudePolygon>
      <sphere
        name="sphere-1"
        diameter={3}
        position={mem(new Vector3(2, 0, 0))}
        isVisible={false}
        ref={setSphere}
      />
      {!!mesh && (
        <abstractMesh
          name="extrude"
          disposeInstanceOnUnmount
          fromInstance={mesh}
          position={mem(new Vector3(0, 4, 0))}
        >
          <standardMaterial
            name="extrudeMaterial"
            diffuseColor={mem(Color3.Yellow())}
            specularColor={mem(Color3.Black())}
          />
        </abstractMesh>)}
    </>
  )
}
