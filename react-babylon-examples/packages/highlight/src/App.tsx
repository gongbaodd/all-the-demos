import { Color3, HighlightLayer, Mesh, Vector3 } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { Engine, Scene } from "react-babylonjs";

export function App() {
    return (
        <Engine
            antialias
            adaptToDeviceRatio
            canvasId="babylonJS"
        >
            <Scene>
                <Stage />
            </Scene>
        </Engine>
    )
}

function Stage() {
    const lightLayerRef = useRef<HighlightLayer>(null);
    const sphereRef = useRef<Mesh>(null);

    useEffect(() => {
        if (!lightLayerRef.current) return
        if (!sphereRef.current) return
console.log('adding mesh')
        lightLayerRef.current.addMesh(sphereRef.current, Color3.White())

    }, [lightLayerRef, sphereRef])

    return (
        <>
            <freeCamera
                name="camera1"
                position={new Vector3(0, 5, -10)}
                setTarget={[Vector3.Zero()]}
            />
            <hemisphericLight
                name="light1"
                intensity={0.7}
                direction={Vector3.Up()}
            />
            <highlightLayer
                name="highlight"
                ref={lightLayerRef}
            />
            <sphere
                name="sphere1"
                diameter={2}
                segments={16}
                position={new Vector3(0, 1, 0)}
                ref={sphereRef}
            />

            <ground
                name="ground1"
                width={6}
                height={6}
                subdivisions={2}
            />
        </>
    )
}