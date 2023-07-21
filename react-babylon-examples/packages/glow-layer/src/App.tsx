import { Color3, Color4, Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";
import { ScaledModelWithProgress } from "./ScaledModelWithProgress";

export function App() {
    return (
        <Engine
            antialias
            adaptToDeviceRatio
            canvasId="babylonJS"
        >
            <Scene
                clearColor={new Color4(.02, .02, .02, 1)}
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
                    radius={5}
                    lowerRadiusLimit={20}
                    upperRadiusLimit={80}
                    target={new Vector3(0, 0, 0)}
                    useAutoRotationBehavior
                />
                <hemisphericLight
                    name="light1"
                    direction={Vector3.Up()}
                />
                <glowLayer
                    name="glow"
                    options={{ mainTextureSamples: 2 }}
                    isEnabled
                >
                    <ScaledModelWithProgress
                        center={new Vector3(0, 0, 0)}
                        sceneFilename="NeonPipe.gltf?v=1"
                        rootUrl="https://www.babylonjs.com/Assets/NeonPipe/glTF/"
                        progressBarColor={Color3.FromInts(255, 165, 0)}
                        scaleTo={1}
                    />
                </glowLayer>
                <environmentHelper
                    options={{
                        groundSize: 160,
                        skyboxSize: 160,
                        sizeAuto: false,
                    }}
                    setMainColor={[
                        Color3.Gray(),
                    ]}
                />
            </Scene>
        </Engine>
    )
}