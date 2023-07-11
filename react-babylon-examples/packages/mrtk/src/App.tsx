import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Vector3 } from "@babylonjs/core";
import { TouchHolographicButton } from "@babylonjs/gui/3D/controls/MRTK3/touchHolographicButton";
import { Suspense, useEffect, useState } from "react";
import { GUI3DManager } from "@babylonjs/gui";

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
    const [manager, setManager] = useState<GUI3DManager|null>(null)

    useEffect(() => {
        if (!manager) return

        var touchHoloTextButton = new TouchHolographicButton("TouchHoloTextButton");
        manager.addControl(touchHoloTextButton);
        touchHoloTextButton.position = new Vector3(0.05, 1.8, 0);
        touchHoloTextButton.text = "Text Me";
        touchHoloTextButton.onPointerDownObservable.add(()=>{
            alert("I display texts")
        });
    }, [manager])
    

    return (
        <gui3DManager ref={setManager}>
            <touchHolographicButton
                name="button"
                position={mem(new Vector3(0.1, 1.7, 0))}
                text="Click me!"
                onPointerDownObservable={() => { alert('clicked!') }}
            />
        </gui3DManager>
    )
}
