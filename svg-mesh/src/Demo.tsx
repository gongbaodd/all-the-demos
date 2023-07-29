import vertexSource from "./shaders/demo.vert?raw"
import fragmentSource from "./shaders/demo.frag?raw"
import { useEffect, useRef, useState } from "react"
import { ShaderMaterial, Texture, Vector3, Mesh } from "@babylonjs/core"
import { useBeforeRender, useScene } from "react-babylonjs"

export function Demo() {
    const scene = useScene()
    const [mesh, setMesh] = useState<Mesh|null>(null)
    const [mat, setMat] = useState<ShaderMaterial|null>(null)
    const [amiga, setAmiga] = useState<Texture|null>(null)
    const [ref, setRef] = useState<Texture|null>(null)
    const time = useRef(0)

    useEffect(() => {
        if (!mat) return

        mat.setFloat("time", time.current)
        mat.setVector3("camPosition", Vector3.Zero())

        if (amiga) {
            mat.setTexture("textureSampler", amiga)
        }

        if (ref) {
            mat.setTexture("refSampler", ref)
        }

    }, [mat, amiga, ref])

    useBeforeRender(() => {
        if (!mesh) return
        if (!mat) return
        if (!scene) return

        const {activeCamera} = scene        

        mesh.rotation.y += 0.01

        mat.setFloat("time", time.current)
        time.current += 0.02

        if (activeCamera) {
            mat.setVector3("camPosition", activeCamera.position)
        }
    }, undefined, undefined, undefined, [mesh, mat, scene])

    return (
        <sphere name="sphere" diameter={2} segments={32} ref={setMesh} >
            <shaderMaterial name="sphere-material"
                shaderPath={{
                    vertexSource, fragmentSource
                }}
                options={{
                    attributes: ["position", "uv", "normal"],
                    uniforms: ["worldViewProjection", "world", "time"]
                }}
                backFaceCulling={false}
                ref={setMat}
            >
                <texture name="amiga" url="./amiga.jpg" ref={setAmiga} />
                <texture name="ref" url="./ref.jpg"  ref={setRef} 
                    wrapU={Texture.CLAMP_ADDRESSMODE} 
                    wrapV={Texture.CLAMP_ADDRESSMODE} 
                />
            </shaderMaterial>
        </sphere>
    )
}