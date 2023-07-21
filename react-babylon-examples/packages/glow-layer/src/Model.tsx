import { Scene, SceneLoader } from "@babylonjs/core";
import { future } from "../../future/src";
import { Suspense } from "react";

const rootUrl = "./scenes/_assets/";
const use = future<Scene>();

function ImportedScene() {
    // return null
    const scene = use(() => SceneLoader.AppendAsync(
        "https://www.babylonjs.com/Assets/NeonPipe/glTF/",
        "NeonPipe.gltf?v=1"
    ))

    scene?.activeCamera?.attachControl()

    return null;
}

export function Modal() {
    return (
        <Suspense >
            <ImportedScene />
        </Suspense>
    )
}