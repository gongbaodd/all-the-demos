import React, { useContext, useEffect } from "react"
import { SceneUtils } from "./Scene"
import { MeshBuilder, Scene as BScene, Mesh as BMesh } from "@babylonjs/core"
import { setForwardRef } from "../utils/ref"

export type MeshInit = (builder: typeof MeshBuilder, scene: BScene) => BMesh

type Props = {
    init: MeshInit
}

export const Mesh = React.forwardRef<BMesh, Props>(function({ init }, ref) {
    const scene = useContext(SceneUtils.Context!)

    useEffect(() => {
        const mesh = init(MeshBuilder, scene)

        setForwardRef(ref, mesh)

        return () => mesh.dispose()
    }, [scene, init])

    return null
})