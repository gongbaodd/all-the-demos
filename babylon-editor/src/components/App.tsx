import { BabylonFileLoaderConfiguration, Vector3 } from "@babylonjs/core";
import { Suspense, useMemo, useRef } from "react";
import { Engine, Scene, useScene } from "react-babylonjs";
import { appendScene } from "../scenes/tools";

import * as CANNON from "cannon";


export function App() {
    return (
        <Engine>
            <Scene>
                <Suspense fallback="loading">
                    <Stage />
                </Suspense>
                <arcRotateCamera name="camera1" target={new Vector3(0, 1, 0)} alpha={-Math.PI / 2} beta={(0.5 + (Math.PI / 4))} radius={4} />
            </Scene>
        </Engine>
    )
}

BabylonFileLoaderConfiguration.LoaderInjectedPhysicsEngine = CANNON;

export function Stage() {
    const scene = useScene()
    const rootUrl = "./scenes/_assets/";
    const loaded = useRef(false)
    const suspender = useRef(new Promise(() => {
        if (!scene) return null
        appendScene(scene, rootUrl, "../scene1/scene.babylon").then(() => {
            console.log("Scene loaded")
            loaded.current = true

            const engine = scene.getEngine()

            scene.activeCamera.attachControl(engine.getRenderingCanvas(), false);
            console.log(scene)
            engine.runRenderLoop(() => {
                scene.render()
            });
        })
    }))

    console.log(suspender)

    if (!loaded.current) throw suspender.current

    return null
}