import { Vector3, Scene as BS, Material, StandardMaterial } from "@babylonjs/core";
import { useCallback, useState } from "react";
import { Engine, Scene } from "react-babylonjs";
import { FireProceduralTexture } from "@babylonjs/procedural-textures"

export function App() {
    const [scene, setScene] = useState<BS|null>(null)
    const fireRef = useCallback((mat: StandardMaterial) => {
        if (!scene) return
        const fire = new FireProceduralTexture("fire", 256, scene)
        const fireMaterial = mat
        fireMaterial.diffuseTexture = fire
        fireMaterial.opacityTexture = fire
    }, [scene])

    return (
        <Engine
            antialias
            adaptToDeviceRatio
            canvasId="babylonJS"
        >
            <Scene onSceneMount={({ scene }) => setScene(scene)}>
                <arcRotateCamera
                    name="camera1"
                    alpha={-2}
                    beta={Math.PI / 2}
                    radius={8}
                    minZ={0.001}
                    wheelPrecision={50}
                    target={new Vector3(-5, 0, -10)}
                />
                <hemisphericLight
                    name="light1"
                    direction={Vector3.Up()}
                />
                <plane
                    name="plane1"
                    size={20}
                >
                    <standardMaterial
                        name="plane1-material"
                        ref={fireRef}
                    />
                </plane>
            </Scene>
        </Engine>
    )
}