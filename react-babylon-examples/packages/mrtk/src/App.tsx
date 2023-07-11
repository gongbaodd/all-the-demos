import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Vector3 } from "@babylonjs/core";
import { TouchHolographicButton } from "@babylonjs/gui/3D/controls/MRTK3/touchHolographicButton";
import { Suspense } from "react";

TouchHolographicButton.MRTK_ASSET_BASE_URL = "../assets/";

console.log({ ...TouchHolographicButton })


export function App() {
    const mem = useMem()
    return (
        <Engine
            antialias
            adaptToDeviceRatio
            canvasId="sample-canvas"
            style={{ flex: 1 }}
        >
            <Scene>
                <freeCamera
                    name="camera1"
                    position={mem(new Vector3(0, 1.7, -7))}
                />
                <hemisphericLight
                    name="light1"
                    intensity={0.7}
                    direction={mem(Vector3.Up())}
                />
                <sphere
                    name="sphere1"
                    diameter={.3}
                    segments={32}
                    position={mem(new Vector3(0, 1.7, 0.5))}
                >
                    <standardMaterial
                        name="sphere-material"
                    />
                </sphere>
                <Suspense>
                    <UI />
                </Suspense>
                <vrExperienceHelper
                    webVROptions={{ createDeviceOrientationCamera: false }}
                    enableInteractions
                />
            </Scene>
        </Engine>
    )
}

function UI() {
    const mem = useMem()
    

    return (
        <gui3DManager>
            <touchHolographicButton
                name="button"
                position={mem(new Vector3(0.1, 1.7, 0))}
                text="Click me!"
                onPointerDownObservable={() => { alert('clicked!') }}
            />
        </gui3DManager>
    )
}
