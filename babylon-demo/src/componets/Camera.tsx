import React, { useContext, useEffect } from "react"
import { ArcRotateCamera, Vector3, Scene as BScene } from "@babylonjs/core"
import { SceneUtils } from "./Scene"
import { setForwardRef } from "../utils/ref"

// type CameraParam = ConstructorParameters<typeof ArcRotateCamera>
type props = {
    name: string,
    alpha: number,
    beta: number,
    radius: number,
    target: Vector3,
    setActiveOnSceneIfNoneActive?: boolean,
}

export const Camera = React.forwardRef<ArcRotateCamera, props>(({ name, alpha, beta, radius, target, setActiveOnSceneIfNoneActive }, ref) => {
    const scene = useContext(SceneUtils.Context!)
    useEffect(() => {
        const camera = new ArcRotateCamera( name, alpha, beta, radius, target, scene ,setActiveOnSceneIfNoneActive);
        camera.attachControl(scene, true)

        setForwardRef(ref, camera)

        return () => camera.dispose()
    }, [ name, alpha, beta, radius, target, setActiveOnSceneIfNoneActive, scene])

    return null
})

Camera.displayName = "Camera"