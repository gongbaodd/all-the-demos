import { Buffer, Color3, Material, Mesh, Plane, ShaderMaterial, Texture, Vector3, VertexBuffer } from "@babylonjs/core";
import { useCallback, useEffect, useState } from "react";
import { useEngine } from "react-babylonjs";
import vertexSource from "./shaders/content.vert?raw"
import fragmentSource from "./shaders/content.frag?raw"

const CHARS = getChars()
const ATLAS = createAtlas("Menlo", 300)
const ATLAS_COORD = getAtlasCoord()
const UVS_CORE = getUvsCore()
const INDICES_CORE = getIndicesCore()
const NEW_INDICES = makeNewIndices(INDICES_CORE)
const NEW_NORMALS = makeNewNormals()
const NEW_UVS = makeNewUVs(UVS_CORE)
const { 
    newPositions: NEW_POSITIONS,
    pageCoord: PAGE_COORD,
} = makeNewPos(UVS_CORE, NEW_UVS)

export function Text() {
    const engine = useEngine()
    const [font, setFont] = useState<Texture|null>(null)

    const planeRef = useCallback((pageOne: Mesh) => {
        if (!engine) return

        pageOne.updateVerticesData(VertexBuffer.PositionKind, NEW_POSITIONS)
        pageOne.updateVerticesData(VertexBuffer.NormalKind, NEW_NORMALS)
        pageOne.updateVerticesData(VertexBuffer.UVKind, NEW_UVS)
        pageOne.updateIndices(NEW_INDICES)

        const posCoordBuffer = new Buffer(engine, PAGE_COORD, false, 2)
        pageOne.setVerticesBuffer(
            posCoordBuffer.createVertexBuffer("aPageCoord", 0, 2)
        )

        const posAtalsBuffer = new Buffer(engine, ATLAS_COORD, false, 2)
        pageOne.setVerticesBuffer(
            posAtalsBuffer.createVertexBuffer("aAtlasCoord", 0, 2)
        )

        pageOne.position = new Vector3(0,1,8)
    }, [engine])

    const shaderRef = useCallback((shader: ShaderMaterial) => {
        if (!font) return
        shader.setTexture("textureSampler", font)
    }, [font])
    
    return (
        <plane name="pageOne" size={5} 
            sideOrientation={Mesh.DOUBLESIDE}
            ref={planeRef}
        >
            <standardMaterial name="ref" >
                <texture name="atlas" url={ATLAS} 
                    assignTo="diffuseTexture"
                    ref={setFont}
                />
            </standardMaterial>
            <shaderMaterial name="shader"
                shaderPath={{ vertexSource, fragmentSource }}
                options={{
                    attributes: ["position", "normal", "uv", "aPageCoord", "aAtlasCoord"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
                }}
                backFaceCulling={false}
                ref={shaderRef}
            >
            </shaderMaterial>
        </plane>
    )
}

function getChars() {
    return [
        "ABCDEFGH",
        "IJKLMNOP",
        "QRSTUVWX",
        "abcdefgh",
        "ijklmnop",
        "qrstuvwx",
        "12345678",
        " -+=,.<>"
    ]
}

function createAtlas(family: string, size: number) {
    const canvas = document.createElement("canvas")
    const netSize = Math.floor(.96*(size-4))

    canvas.width = size * CHARS[0].length
    canvas.height = size * CHARS.length

    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "rgba(224,168,112,1.0)"
    ctx.font = `${netSize}px ${family}`

    for (let i = 0; i < CHARS.length; i++) {
        const row = CHARS[i]
        for (let j = 0; j < row.length; j++) {
            const char = row[j]
            ctx.fillText(char, j * size + 2, i * size + netSize)
        }
    }

    return canvas.toDataURL("image/jpeg", 1)
}

function getAtlasCoord() {
    return [
        -1.000, -1.000, -0.750, -1.000, -0.750, -0.750, -1.000, -0.750,
        -0.250,  0.500,      0,  0.500,      0,  0.750, -0.250,  0.750,
        -1.000, -1.000, -0.750, -1.000, -0.750, -0.750, -1.000, -0.750,
         0.500,  0.500,  0.750,  0.500,  0.750,  0.750,  0.500,  0.750,
        -1.000, -1.000, -0.750, -1.000, -0.750, -0.750, -1.000, -0.750,
         0.250,  0.250,  0.500,  0.250,  0.500,  0.500,  0.250,  0.500,
        -1.000, -1.000, -0.750, -1.000, -0.750, -0.750, -1.000, -0.750,
             0,  0.750,  0.250,  0.750,  0.250,  1.000,      0,  1.000,
        -1.000, -1.000, -0.750, -1.000, -0.750, -0.750, -1.000, -0.750,
         0.500,  0.750,  0.750,  0.750,  0.750,  1.000,  0.500,  1.000,
        -0.250, -1.000,      0, -1.000,      0, -0.750, -0.250, -0.750,
        -0.250,  0.500,      0,  0.500,      0,  0.750, -0.250,  0.750,
        -0.250, -1.000,      0, -1.000,      0, -0.750, -0.250, -0.750,
        -0.500,  0.250, -0.250,  0.250, -0.250,  0.500, -0.500,  0.500,
        -1.000, -1.000, -0.750, -1.000, -0.750, -0.750, -1.000, -0.750,
        -0.250,  0.500,      0,  0.500,      0,  0.750, -0.250,  0.750
    ]
}

function getUvsCore() {
    return [
        0,     0,  0.250,     0, 0.250, 0.250,     0, 0.250,
        0, 0.250,  0.250, 0.250, 0.250, 0.500,     0, 0.500,
    0.250,     0,  0.500,     0, 0.500, 0.250, 0.250, 0.250,
    0.250, 0.250,  0.500, 0.250, 0.500, 0.500, 0.250, 0.500
    ]
}

function getIndicesCore() {
    return [
        0,   1,   2,   0,   2,   3,
        4,   5,   6,   4,   6,   7,
        8,   9,  10,   8,  10,  11,
       12,  13,  14,  12,  14,  15
  ]
}

function makeNewIndices(indices: number[]) {
    const { length } = indices
    const newIndices = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < length; j++) {
            newIndices[i*length+j] = indices[j] + i*16 
        }
    }

    return newIndices
}

function makeNewNormals() {
    const normals = []
    for (let i = 0; i < 64; i++) {
        normals[3*i] = 0
        normals[3*i+1] = 0
        normals[3*i+2] = -1
    }
    return normals
}

function makeNewUVs(uvsCore: number[]) {
    const newUVs = []
    const { length: l } = uvsCore
    let i, j, k;
    let x, y;

    for(i=0;i<4;i++){
        x = 0;
        y = 0;
        if(i===1||i===3){x=0.500}
        if(i===2||i===3){y=0.500}
        for(j=0;j<l;j++){
            k = j-2*Math.floor(0.00001+j/2);
            if(k===0){
                newUVs[i*l+j] = uvsCore[j]+x
            }
            if(k===1){
                newUVs[i*l+j] = uvsCore[j]+y                
            }
        }
    }

    return newUVs
}

function makeNewPos(uvsCore: number[], newUVs: number[]) {
    const newPositions = []
    const pageCoord = []
    const l = uvsCore.length * 2

    let i;

    for(i=0;i<l;i++){
        newPositions[i+i+i+0] = -2+4*newUVs[i+i+0];
        newPositions[i+i+i+1] = -2+4*newUVs[i+i+1];
        newPositions[i+i+i+2] = 0
        pageCoord[i+i+0]      = -2+4*newUVs[i+i+0];
        pageCoord[i+i+1]      = -2+4*newUVs[i+i+1];
    }

    return { newPositions, pageCoord }
}