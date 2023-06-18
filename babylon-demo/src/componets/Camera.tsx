import React, { useCallback, useContext, useMemo } from 'react'
import { SceneComponent, TSceneInstance, TUniversalCamera, UniversalCameraComponent } from './Babylon'
import { TransformNode, Vector3 } from '@babylonjs/core'

export const Camera = () => {
    const scene = useContext(SceneComponent.Context!)
    const root = useMemo(() => {
        const root = new TransformNode("root")
        root.position = new Vector3(0, 0, 0)
        root.rotation = new Vector3(0, Math.PI, 0)
        return root
    }, [])

    const yTilt = useMemo(() => {
        const yTilt = new TransformNode("yTilt")
        // yTilt.rotation = Player.ORIGINAL_TILT
        return yTilt
    }, [])

    const init = useCallback((Camera: TUniversalCamera, scene: TSceneInstance) => {
        const camera = new Camera("playerCam", new Vector3(0, 0, -30), scene)
        camera.lockedTarget = root.position
        camera.fov = 0.5
        scene.activeCamera = camera
        return camera
    }, [])

    return (
        <UniversalCameraComponent initNode={init} scene={scene}  />
    )
}
