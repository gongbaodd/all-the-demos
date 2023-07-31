import { Buffer, Color3, Mesh, ShaderMaterial, Vector3, VertexData } from "@babylonjs/core"
import { useEffect, useMemo, useState } from "react"
import { useEngine, useScene } from "react-babylonjs"
import vertexSource from "./shaders/move.vert?raw"
import fragmentSource from "./shaders/blue.frag?raw"
import triagnleCentroid from "triangle-centroid"
import randomVec from "gl-vec3/random"
import svgMesh3d from "svg-mesh-3d"


export function makeVertex(pos: number[][], cell: number[][]) {
    const positions = pos.flat()
    const indices = cell.flat()
    const vertexData = new VertexData()

    vertexData.positions = positions
    vertexData.indices = indices

    return vertexData
}


export function getShaderAttr(pos: number[][], cells: number[][]) {
    const centroid: number[] = []
    const directions: number[] = []

    cells.forEach(([p1, p2, p3]) => {
        const triangle = [pos[p1], pos[p2], pos[p3]]
        const [cx, cy, cz] = triagnleCentroid(triangle)
        const [rx, ry, rz] = randomVec([], Math.random())

        for (let i = 0; i < 3; i++) {
            centroid.push(cx, cy, cz)
            directions.push(rx, ry, rz)
        }
    })

    return { centroid, directions }
}

export function SimplicialComplex(props: {
    svgPath: string
}) {
    const engine = useEngine()

    const mesh = useMemo(() => {
        if (!engine) return null

        const meshData = svgMesh3d(props.svgPath)
        const vertexData = makeVertex(meshData.positions, meshData.cells)
        const { centroid, directions } = getShaderAttr(meshData.positions, meshData.cells)

        const mesh = new Mesh("simplicial-complex")

        vertexData.applyToMesh(mesh)

        const centroidBuffer = new Buffer(engine, centroid, false, 3)
        const centroidVBuffer = centroidBuffer.createVertexBuffer("center", 0, 3)
        mesh.setVerticesBuffer(centroidVBuffer)

        const directionBuffer = new Buffer(engine, directions, false, 3)
        const directionVBuffer = directionBuffer.createVertexBuffer("direction", 0, 3)
        mesh.setVerticesBuffer(directionVBuffer)

        // mesh.registerInstancedBuffer("centroid", 3)
        // mesh.instancedBuffers.centroid = centroidBuffer

        // mesh.registerInstancedBuffer("direction", 3)
        // mesh.instancedBuffers.direction = directionBuffer

        return mesh
    }, [props.svgPath, engine])

    const [mat, setMat] = useState<ShaderMaterial | null>(null)

    useEffect(() => {
        if (!mat) return

    }, [mat])

    return (
        <abstractMesh name="sc" fromInstance={mesh} disposeInstanceOnUnmount >
            <shaderMaterial name="sc-material"
                shaderPath={{
                    vertexSource, fragmentSource
                }}
                backFaceCulling={false}
                options={{
                    attributes: ["position", "direction", "projection", "view", "center"]
                }}
                ref={setMat}
                wireframe={true}
            />
        </abstractMesh>
    )

}