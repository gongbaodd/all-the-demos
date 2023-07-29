import { Color3, Mesh, VertexData, ShaderMaterial, ShaderStore } from "@babylonjs/core"
import { useCallback, useMemo } from "react"
import { useScene } from "react-babylonjs"
import vertexSource from "./shaders/red.vert?raw"
import fragmentSource from "./shaders/red.frag?raw"


export function makeVertex(pos: number[][], cell: number[][]) { 
    const positions = pos.flat()
    const indices = cell.flat()
    const vertexData = new VertexData()

    vertexData.positions = positions
    vertexData.indices = indices

    return vertexData
}

export function SimplicialComplex(props: {vertexData: VertexData}) {
    const scene = useScene()

    const mesh = useMemo(() => {
        const mesh = new Mesh("simplicial-complex")
        props.vertexData.applyToMesh(mesh)

        // if (scene) {
        //     const shader = new ShaderMaterial("sc-shader", scene, 'custom', {})
        //     mesh.material = shader
        // }

        return mesh
    }, [props])

    return (
        <abstractMesh name="sc" fromInstance={mesh} disposeInstanceOnUnmount >
            {/* <standardMaterial name="sc-material" 
                backFaceCulling={false}
                diffuseColor={Color3.FromHexString("#1DA1F2")}   
            /> */}
            <shaderMaterial name="sc-material"
                shaderPath={{
                    vertexSource, fragmentSource
                }}
                backFaceCulling={false}
            />
        </abstractMesh>
    )

}