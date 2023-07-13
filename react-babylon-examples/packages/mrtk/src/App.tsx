import { Engine, Scene, useScene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { SixDofDragBehavior, Vector2, Vector3 } from "@babylonjs/core";
import { TouchHolographicButton } from "@babylonjs/gui/3D/controls/MRTK3/touchHolographicButton";
import { Suspense, useEffect, useState } from "react";
import { CylinderPanel, GUI3DManager, HolographicSlate, Image } from "@babylonjs/gui";
import { Inspector } from "../../inspector/src";

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
                <utilityLayerRenderer>
                    <sphere
                        name="sphere1"
                        diameter={.3}
                        segments={32}
                        position={mem(new Vector3(0, 1.7, 0.5))}
                    >
                        <positionGizmo />
                        <standardMaterial
                            name="sphere-material"
                        />
                    </sphere>
                </utilityLayerRenderer>

                <Suspense>
                    <UI />
                </Suspense>
            </Scene>
        </Engine>
    )
}

function UI() {
    const mem = useMem()
    const [manager, setManager] = useState<GUI3DManager | null>(null)
    const [panel, setPanel] = useState<CylinderPanel | null>(null)

    const scene = useScene()

    useEffect(() => {
      if (!scene) return
      const env = scene.createDefaultEnvironment()
      if (!env || !env.ground) return
      scene.createDefaultXRExperienceAsync({
        floorMeshes: [env.ground]
      })
    }, [scene])

    useEffect(() => {
        if (!manager || !panel) return

        var touchHoloTextButton = new TouchHolographicButton("TouchHoloTextButton");
        manager.addControl(touchHoloTextButton);
        panel.addControl(touchHoloTextButton);
        touchHoloTextButton.text = "Text Me";
        touchHoloTextButton.onPointerDownObservable.add(() => {
            // alert("I display texts")
        });


        var holoSlate = new HolographicSlate("holoSlate");
        manager.addControl(holoSlate);

        holoSlate.dimensions = new Vector2(10, 10);
        holoSlate.position = new Vector3(-36, 0, 30);
        holoSlate.title = "A scrollable cat";
        holoSlate.content = new Image("cat", "https://placekitten.com/300/300");

    }, [manager, panel])


    return (
        <gui3DManager ref={setManager}>
            <cylinderPanel margin={.2} ref={setPanel}>
                <touchHolographicButton
                    name="button"
                    text="Click me!"
                    onPointerDownObservable={() => { }}
                >
                </touchHolographicButton>

                <button3D
                    name="button3D"
                    position={mem(new Vector3(-1, 0, 0))}
                />


            </cylinderPanel>



        </gui3DManager>
    )
}
