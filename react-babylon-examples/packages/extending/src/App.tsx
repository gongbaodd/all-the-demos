import { Engine, Scene } from "react-babylonjs";
import { ColorSelect, ColorSelectProvider } from "./ColorSelect";
import { useMem } from "../../hooks/src/useMem";
import { Color3, Vector3 } from "@babylonjs/core";

export function App() {
    const mem = useMem()
    return (
        <ColorSelectProvider>
            <ColorSelect />
            <Engine
                antialias
                adaptToDeviceRatio
                canvasId="sample-canvas"
            >
                <Scene>
                    <arcRotateCamera
                        name="camera1"
                        target={mem(Vector3.Zero())}
                        minZ={.001}
                        alpha={-Math.PI / 4}
                        beta={Math.PI / 4}
                        radius={5}
                        upperBetaLimit={Math.PI / 2}
                    />
                    <hemisphericLight
                        name="light1"
                        intensity={0.7}
                        direction={mem(Vector3.Up())}
                    />
                    <ground
                        name="ground1"
                        width={6}
                        height={6}
                        subdivisions={2}
                    >
                        <myCustomMaterial
                            name="grid-material"
                            lineColor={mem(Color3.FromHexString('#333333'))}
                        />
                    </ground>
                </Scene>
            </Engine>
        </ColorSelectProvider>
    );
}

