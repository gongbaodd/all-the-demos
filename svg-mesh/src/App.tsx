import { MeshBuilder, Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";
import svgMesh3d from "svg-mesh-3d"

const svgPath = "M173 102a51 51 0 1 1-13-30m20 37h-53";
const meshData = svgMesh3d(svgPath)

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
                    target={new Vector3(0, 0, 0)} 
                    alpha={Math.PI / 2} 
                    beta={Math.PI / 4} 
                    radius={5} 
                />
            </Scene>
        </Engine>
    )
}