import { Vector3, Mesh, VertexData } from "@babylonjs/core"
import { useScene } from "react-babylonjs"
import { useMemo } from "react"

export function CustomMesh(
  props: {
    name: string
    position: Vector3
    useWireFrame?: boolean
  }
) {
  const scene = useScene()
  const customMesh = useMemo(() => {
    if (!scene) return

    const meshInstance = new Mesh(props.name, scene)

    const positions = [
      -5, 2, -3,
      -7, -2, -3,
      -3, -2, -3,
      5, 2, 3,
      7, -2, 3,
      3, -2, 3,
    ]
    const indices = [
      0, 1, 2,
      3, 4, 5,
    ]
    const colors = [
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      0, 1, 0, 0,
      0, 1, 1, 0,
      0, 1, 0, 1,
    ]

    const normals: number[] = []
    const vertexData = new VertexData()
    VertexData.ComputeNormals(positions, indices, normals)
    vertexData.positions = positions
    vertexData.indices = indices
    vertexData.colors = colors
    vertexData.normals = normals

    vertexData.applyToMesh(meshInstance)

    return meshInstance
  }, [scene])

  return (
    <mesh
      name={props.name}
      disposeInstanceOnUnmount
      position={props.position}
      fromInstance={customMesh}
    >
      <standardMaterial
        name={`${props.name}-material`}
        wireframe={props.useWireFrame}
      />
    </mesh>
  )
}
