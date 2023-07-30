import vertexSource from "./shaders/fireworks.vert?raw";
import fragmentSource from "./shaders/fireworks.frag?raw";
import { useBeforeRender } from "react-babylonjs";
import { useEffect, useRef, useState } from "react";
import { Mesh, ShaderMaterial } from "@babylonjs/core";

export function Fireworks() {
    const [sphere, setSphere] = useState<Mesh | null>(null)
    const [mat, setMat] = useState<ShaderMaterial | null>(null)
    const time = useRef(0)

    useEffect(() => {
        if (!sphere) return
        sphere.convertToFlatShadedMesh()
    }, [sphere])

    useBeforeRender(() => {
        if (!mat) return
        mat.setFloat("time", time.current)
        time.current += 0.001
    }, undefined, undefined, undefined, [mat])

    return (
        <sphere name="fireworks" ref={setSphere}>
            <shaderMaterial name="fireworks-mat"
                ref={setMat}
                shaderPath={{vertexSource, fragmentSource}}
                options={{
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["worldViewProjection", "time"],
                    needAlphaBlending: true,
                }}
                backFaceCulling={false}
            />
        </sphere>
    )
}