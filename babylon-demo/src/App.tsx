import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { Canvas } from "./componets/Canvas"
import { Engine, EngineUtils } from "./componets/Engine"
import { Scene, SceneUtils } from "./componets/Scene"
import { Camera } from "./componets/Camera"
import { Vector3 } from "@babylonjs/core"
import { Light } from "./componets/Light"
import { Mesh, MeshInit } from "./componets/Mesh"
import { useFrame } from "./hooks/useFrame"

export const App: FC = () => {
    const [engine, setEngine] = EngineUtils.useState()
    const engineRef = EngineUtils.useRef(setEngine)

    const [scene, setScene] = SceneUtils.useState()
    const sceneRef = SceneUtils.useRef(setScene)

    const sphereInit: MeshInit = useCallback((builder, scene) => {
        return builder.CreateSphere("sphere", { diameter: 1 }, scene)
    }, [])

    const camTarget = useMemo(() => new Vector3(0,0,0), [])
    const lightDirection = useMemo(() => new Vector3(1,1,0), [])

    useFrame(engine, scene)

    return ( 
    <Canvas id="game" style={{width: "100%", height: "100%"}} tabIndex={0}>
        <Engine ref={engineRef}>
            <Scene ref={sceneRef}>
                <Camera name="camera" alpha={Math.PI/2} beta={Math.PI/2} radius={2} target={camTarget}/>
                <Light name="light1" direction={lightDirection}/>
                <Mesh init={sphereInit} />
            </Scene>
        </Engine>
    </Canvas>
    )
}


