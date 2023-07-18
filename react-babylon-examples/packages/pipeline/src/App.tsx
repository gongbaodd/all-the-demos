import { Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";

export function App() {
    return (
        <Engine
            antialias
            adaptToDeviceRatio
            canvasId="sample-canvas"
        >
            <Scene>
                <arcRotateCamera
                    name="camera1"
                    alpha={Math.PI / 2 + .5}
                    beta={Math.PI / 2 -.5}
                    radius={10}
                    target={Vector3.Zero()}
                />
                <hemisphericLight 
                    name="light1"
                    direction={Vector3.Up()}
                />
                <box name="test" />
                <defaultRenderingPipeline
                    hdr
                    chromaticAberrationEnabled
                    grainEnabled
                >
                    <chromaticAberrationPostProcess 
                        assignFrom="chromaticAberration"
                        aberrationAmount={-100}
                        radialIntensity={.2}
                        {...{} as any}
                    />
                    <grainPostProcess 
                        assignFrom="grain"
                        intensity={.2}
                        {...{} as any}
                    />
                </defaultRenderingPipeline>
            </Scene>
        </Engine>
    )
}