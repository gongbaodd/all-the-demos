import {  Mesh, Vector3, VertexData } from "@babylonjs/core"
import { useMemo } from "react"
import { useScene } from "react-babylonjs"
import vertexSource from "./shaders/move.vert?raw"
import fragmentSource from "./shaders/blue.frag?raw"
import triagnleCentroid from "triangle-centroid"
import randomVec from "gl-vec3/random"


export function makeVertex(pos: number[][], cell: number[][]) { 
    const positions = pos.flat()
    const indices = cell.flat()
    const vertexData = new VertexData()

    vertexData.positions = positions
    vertexData.indices = indices

    return vertexData
}

type ShaderAttr = {
    type: string,
    value: Vector3[]
}

export function getShaderAttr(pos: number[][], cells: number[][]) {
    const centroid: ShaderAttr = {
        type: "v3",
        value: []
    }
    const directions: ShaderAttr = {
        type: "v3",
        value: []
    }
    
    cells.forEach(([p1, p2, p3]) => {
        const triangle = [pos[p1], pos[p2], pos[p3]]
        const center = triagnleCentroid(triangle)
        const dir = Vector3.FromArray(center)
        
        centroid.value.push(dir, dir, dir)

        const random = randomVec([], Math.random())
        const anim = Vector3.FromArray(random)
        directions.value.push(anim, anim, anim)
    })

    return { centroid, directions }
}

export function SimplicialComplex(props: {
    vertexData: VertexData,
    shaderAttrs: ReturnType<typeof getShaderAttr>
}) {
    const mesh = useMemo(() => {
        const mesh = new Mesh("simplicial-complex")
        props.vertexData.applyToMesh(mesh)
        return mesh
    }, [props])

    return (
        <abstractMesh name="sc" fromInstance={mesh} disposeInstanceOnUnmount >
            <shaderMaterial name="sc-material"
                shaderPath={{
                    vertexSource, fragmentSource
                }}
                backFaceCulling={false}
                options={{
                    attributes: ["position", ""]
                }}
            />
        </abstractMesh>
    )

}