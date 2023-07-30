import { Color3, Mesh, Vector3, VertexBuffer, VertexData } from "@babylonjs/core"
import { useMemo } from "react"
import svgMesh3d from "svg-mesh-3d"
import triangleCentroid from "triangle-centroid"
import { random } from "gl-vec3"

const svgPath = "M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"

function createVertexData() {
    const { positions, cells } = svgMesh3d(svgPath)
    const vertexData = new VertexData()

    vertexData.positions = positions.flat()
    vertexData.indices = cells.flat()
    return vertexData
}

function calcDirection(mesh: Mesh) {
    const positions = mesh.getVerticesData(VertexBuffer.PositionKind)
    const indices = mesh.getIndices()

    if (!positions || !indices) return null

    const directions: Vector3[] = []
    const centroid: Vector3[] = []

    for(let i=0; i<indices.length; i+=3) {
        const p1 = indices[i]
        const p2 = indices[i+1]
        const p3 = indices[i+2]

        const triangle = [
            [positions[p1*3], positions[p1*3+1], positions[p1*3+2]],
            [positions[p2*3], positions[p2*3+1], positions[p2*3+2]],
            [positions[p3*3], positions[p3*3+1], positions[p3*3+2]],
        ]

        const center = triangleCentroid(triangle)
        const dir = Vector3.FromArray(center)
        centroid.push(dir, dir, dir)

        const randomVec = random([], Math.random())
        const anim = Vector3.FromArray(randomVec)
        directions.push(anim, anim, anim)
    }

    return { centroid, directions }
}

export function Bird() {
    const mesh = useMemo(() => {
        const vertexData = createVertexData()
        const mesh = new Mesh("bird")
        vertexData.applyToMesh(mesh)
        return mesh
    }, [])

    return (
        <abstractMesh name="bird" fromInstance={mesh} disposeInstanceOnUnmount>
            <standardMaterial name="bird-mat" diffuseColor={Color3.Blue()} backFaceCulling={false} />
        </abstractMesh>
    )
}