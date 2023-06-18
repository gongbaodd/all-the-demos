import React, { forwardRef, useCallback, useContext, useState } from "react"
import { EngineComponent, SceneComponent, TEngineInstance, TScene, TSceneInstance } from "../componets/Babylon"
import { Environment } from "../componets/Environment"
import { Player } from "../componets/Player"
import { setForwardRef } from "../utils/ref"
import { Camera } from "../componets/Camera"

export const GameScene = forwardRef<TSceneInstance, {}>(({}, ref) => {
    const engine = useContext(EngineComponent.Context!)
    const init = useCallback((Scene: TScene, engine: TEngineInstance) => {
        const scene = new Scene(engine)
        setForwardRef(ref, scene)
        return scene
    }, [engine])

    return (
    <SceneComponent engine={engine} initScene={init} >
        <Environment />
        <Player />
        <Camera />
    </SceneComponent>
    )
})

GameScene.displayName = "GameScene"