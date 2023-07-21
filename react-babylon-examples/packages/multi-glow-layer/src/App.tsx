import { Color3, Color4, Vector3, Engine as BE, ArcRotateCamera, Mesh } from "@babylonjs/core";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Engine, Scene } from "react-babylonjs";
import { resizer } from "./store/resizer"

const BOX_NUM = 20
const RADIUS = 10

export function App() {
    const win = useSyncExternalStore(resizer.subscribe, resizer.getSnapshot)

    const [camera, setCamera] = useState<ArcRotateCamera| null>(null)
    const [handler, setHandler] = useState<Mesh|null>(null)

    return (
        <Engine
            antialias
            adaptToDeviceRatio
            canvasId="babylonJS"
            width={win.width}
            height={win.height}
        >
            <Scene
                clearColor={new Color4(0, 0, 0, 1)}
            >
                <imageProcessingConfiguration
                    assignFrom="imageProcessingConfiguration"
                    contrast={1.6}
                    exposure={.6}
                    toneMappingEnabled
                />
                <arcRotateCamera
                    name="camera1"
                    alpha={2.5}
                    beta={1}
                    radius={25}
                    lowerRadiusLimit={20}
                    upperRadiusLimit={80}
                    target={new Vector3(0, 0, 0)}
                    useAutoRotationBehavior
                    ref={setCamera}
                />
                <hemisphericLight
                    name="hemi"
                    direction={Vector3.Up()}
                />

                <glowLayer
                    name="glow"
                    options={{ mainTextureSamples: 4 }}
                    intensity={1}
                    isEnabled
                    addIncludeOnlyChildren
                >
                    {[...Array(BOX_NUM)].map((_, i) => {
                        const x = Math.cos(i / BOX_NUM * Math.PI * 2) * RADIUS
                        const z = Math.sin(i / BOX_NUM * Math.PI * 2) * RADIUS

                        return (
                            <box
                                name={`box${i}`}
                                key={i}
                                position={new Vector3(x, 1, z)}
                            >
                                <standardMaterial
                                    name={`box-mat${i}`}
                                    diffuseColor={Color3.Red()}
                                    emissiveColor={Color3.Red()}
                                />
                            </box>
                        )
                    })}
                </glowLayer>

                <glowLayer
                    name="glow"
                    options={{ mainTextureSamples: 4 }}
                    intensity={1}
                    isEnabled
                    addIncludeOnlyChildren
                >
                    {[...Array(BOX_NUM)].map((_, i) => {
                        const x = Math.cos(i / BOX_NUM * Math.PI * 2) * RADIUS
                        const z = Math.sin(i / BOX_NUM * Math.PI * 2) * RADIUS

                        return (
                            <box
                                name={`box${i}`}
                                key={i}
                                position={new Vector3(x, 3, z)}
                            >
                                <standardMaterial
                                    name={`box-mat${i}`}
                                    diffuseColor={Color3.Green()}
                                    emissiveColor={Color3.Green()}
                                />
                            </box>
                        )
                    })}
                </glowLayer>
            </Scene>
        </Engine>

    )
}