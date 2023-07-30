import { Color3, Mesh } from "@babylonjs/core"
import { useEffect, useState } from "react"

const vertexSource = /* glsl */`
precision highp float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 customColor;
#include<instancesDeclaration>
uniform mat4 viewProjection;

varying vec3 fColor;

void main() {
    #include<instancesVertex>
    fColor = customColor;
    vec4 p = vec4(position, 1.0);
    gl_Position = viewProjection * finalWorld * p;
}
`

const fragmentSource = /* glsl */`
precision highp float;
varying vec3 fColor;
void main() {
    gl_FragColor = vec4(fColor, 1.0);
}
`

export function CustomColor() {
    const [mesh, setMesh] = useState<Mesh | null>()

    useEffect(() => {
        if (!mesh) return

        mesh.registerInstancedBuffer('customColor', 3)
        mesh.instancedBuffers.customColor = Color3.Red()
    }, [mesh])

    return (
        <sphere
            name="customColor"
            ref={setMesh}
        >
            <shaderMaterial
                name="customColor-mat"
                shaderPath={{ vertexSource, fragmentSource }}
                options={{
                    attributes: ['position', 'normal', 'uv', 'customColor'],
                    uniforms: ['world', 'viewProjection']
                }}
            />
        </sphere>
    )
}