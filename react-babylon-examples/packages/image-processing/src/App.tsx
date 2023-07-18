import { Color3, ColorGradingTexture, FresnelParameters, Scene as BS, Texture, Vector3 } from "@babylonjs/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { Engine, Scene, useBeforeRender } from "react-babylonjs";
import { Inspector } from "../../inspector/src";

const SUNNY_DAY_TEXTURE = "/textures/TropicalSunnyDay";
const COLOR_GRADING_TEXTURE = "/textures/LateSunset.3dl";

export function App() {
    const level = useRef(0)
    const [scene, setScene] = useState<BS | null>(null)
    const [color, setColor] = useState<ColorGradingTexture | null>(null)

    useEffect(() => {
        if (!scene) return;

        scene.getEngine().runRenderLoop(() => {
            if (!color) return;
            color.level = (Math.sin(level.current++ / 120) + 1) / 2
        })
    }, [scene, color])

    return (
        <Engine
            antialias
            adaptToDeviceRatio
            canvasId="sample-canvas"
        >
            <Scene
                onSceneMount={({ scene }) => setScene(scene)}
            >
                <imageProcessingConfiguration
                    assignFrom="imageProcessingConfiguration"
                    colorGradingEnabled={!!color}
                    colorGradingTexture={color!}
                />
                <colorGradingTexture
                        ref={setColor}
                        url={COLOR_GRADING_TEXTURE}
                    />
                <arcRotateCamera
                    name="camera1"
                    radius={10}
                    alpha={Math.PI / 2}
                    beta={Math.PI / 2}
                    target={Vector3.Zero()}
                    position={new Vector3(-15, 3, 0)}
                />
                <pointLight
                    name="omni0"
                    position={new Vector3(-17.6, 18.8, -49.9)}
                />
                <SkyboxAndSphere />
            </Scene>
        </Engine>
    )
}

export function SkyboxAndSphere() {
    return (
        <>
            <sphere
                name="sphere1"
                segments={32}
                diameter={5}
            >
                <standardMaterial
                    name="kosh"
                    specularPower={16}
                    invertRefractionY
                    indexOfRefraction={0.98}
                    diffuseColor={Color3.Black()}
                    emissiveColor={new Color3(.5, .5, .5)}
                    reflectionFresnelParameters={
                        FresnelParameters.Parse({
                            isEnabled: true,
                            leftColor: [1, 1, 1],
                            rightColor: [0, 0, 0],
                            bias: 0.1,
                            power: 1
                        })
                    }
                    emissiveFresnelParameters={
                        FresnelParameters.Parse({
                            isEnabled: true,
                            leftColor: [1, 1, 1],
                            rightColor: [0, 0, 0],
                            bias: 0.5,
                            power: 4
                        })
                    }
                >
                    <cubeTexture
                        assignTo={[
                            "reflectionTexture",
                            "refractionTexture"
                        ]}
                        rootUrl={SUNNY_DAY_TEXTURE}
                    />
                </standardMaterial>
            </sphere>

            <box
                name="skyBox"
                size={100}
            >
                <standardMaterial
                    name="skyBox-mat"
                    backFaceCulling={false}
                    disableLighting
                    diffuseColor={Color3.Black()}
                    specularColor={Color3.Black()}
                >
                    <cubeTexture
                        rootUrl={SUNNY_DAY_TEXTURE}
                        coordinatesMode={Texture.SKYBOX_MODE}
                        assignTo={"reflectionTexture"}
                    />
                </standardMaterial>
            </box>
        </>
    )
}