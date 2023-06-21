import { useCallback, useMemo, useRef, useState } from "react"
import { SceneComponent } from "../componets/Babylon"
import { DebugLayer } from "../utils/DebugLayer"
import { ActionManager, Color3, ExecuteCodeAction, Mesh, MeshBuilder, Nullable, PointLight, Scalar, ShadowGenerator, TransformNode, Vector3 } from "@babylonjs/core"
import { useBeforeRender, useScene } from "react-babylonjs"
import { Player } from "../componets/Player"
import { Camera } from "../componets/Camera"
import { Environment } from "../componets/Environment"
import { Controller } from "../componets/Controller"

export const Game = () => {
    const playerRef = useRef<Mesh | null>(null)
    return (
        <SceneComponent>
            <DebugLayer>
                <Controller>
                    <Environment />
                    <Camera player={playerRef.current} />
                    <Player ref={playerRef} />
                </Controller>
            </DebugLayer>
        </SceneComponent>
    )
}