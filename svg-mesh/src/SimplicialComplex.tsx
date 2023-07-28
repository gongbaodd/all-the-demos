import { Mesh, VertexData } from "@babylonjs/core"
import { useCallback } from "react"

export function makeVertex(pos: number[][], cell: number[][]) { 
    const indices = Object.keys(pos).map(Number)
    const positions = pos.flat()
    const normals = [] satisfies number[]
    const vertexData = new VertexData()
    VertexData.ComputeNormals(positions, indices, normals)

    console.log("normals: ", normals)

    vertexData.positions = positions
    vertexData.indices = indices
    vertexData.normals = normals

    return vertexData
}


export function SimplicialComplex(props: {vertexData: VertexData}) {
    const meshRef = useCallback(() => {
        const mesh = new Mesh("simplicial-complex")
        props.vertexData.applyToMesh(mesh)
        return mesh
    }, [props])
    
    return (
        <abstractMesh name="sc" ref={meshRef}>
            <standardMaterial name="sc-material" backFaceCulling={false} />
        </abstractMesh>
    )
}