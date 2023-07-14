import { SceneLoader, Vector3 } from "@babylonjs/core";
import { Suspense, useEffect } from "react";
import { Engine, Scene, useScene } from "react-babylonjs";

export function App() {
    return (
        <Engine
            antialias
            adaptToDeviceRatio
            canvasId="sample-canvas"
        >
            <Scene>
                <freeCamera
                    name="camera1"
                    position={new Vector3(0, 1.7, -7)}
                    setTarget={[Vector3.Zero()]}
                />
                <hemisphericLight
                    name="light1"
                    intensity={0.7}
                    direction={Vector3.Up()}
                />
                <Suspense>
                    <ImportedScene />
                </Suspense>
            </Scene>
        </Engine>
    )
}

const rootUrl = "./scenes/_assets/";

export function ImportedScene() {
    const scene = useScene()
    let loaded = false;
    const p = SceneLoader.AppendAsync(rootUrl, "../scene/scene.babylon")

    if (!loaded) {
        p.then(() => {
            loaded = true;
            console.log("loaded")
        })
    } else {
        throw p
    }

    return null
}