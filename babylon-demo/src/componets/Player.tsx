import React, { useCallback, useContext } from "react"
import { ArcRotateCameraComponent, MeshComponent, SceneComponent, TArcRotateCamera, TMesh, TMeshBuilder, TSceneInstance } from "./Babylon"
import { Color3, Matrix, Quaternion, StandardMaterial, Vector3 } from "@babylonjs/core"


export const Player = () => {
    const scene = useContext(SceneComponent.Context!)

    const initCollider = useCallback((_: TMesh, scene: TSceneInstance, Builder?: TMeshBuilder) => {
        const outer = Builder!.CreateBox("outer", { width: 2, depth: 1, height: 3 }, scene)
        outer.isVisible = false
        outer.isPickable = false
        outer.checkCollisions = true

        outer.bakeTransformIntoVertices(Matrix.Translation(0, 1.5, 0))

        outer.ellipsoid = new Vector3(1, 1.5, 1)
        outer.ellipsoidOffset = new Vector3(0, 1.5, 0)

        outer.rotationQuaternion = new Quaternion(0, 1, 0, 0);
        return outer
    }, [])

    const initBody = useCallback((_: TMesh, scene: TSceneInstance, Builder?: TMeshBuilder) => {
        const body = Builder!.CreateCylinder("body", {
            height: 3,
            diameterTop: 2,
            diameterBottom: 2,
            tessellation: 0,
            subdivisions: 0
        }, scene)
        const material = new StandardMaterial("ref", scene)
        material.diffuseColor = new Color3(0.8, 0.5, 0.5)

        body.material = material
        body.isPickable = false
        body.bakeTransformIntoVertices(Matrix.Translation(0, 1.5, 0))
        return body
    }, [])

    const initInner = useCallback((_: TMesh, scene: TSceneInstance, Builder?: TMeshBuilder) => {
        const box = Builder!.CreateBox("inner", { width: 0.5, depth: 0.5, height: 0.25 }, scene)
        return box
    }, [])

    return (
        <MeshComponent scene={scene} initNode={initCollider}>
            <MeshComponent scene={scene} initNode={initBody} >
                <MeshComponent scene={scene} initNode={initInner} />
            </MeshComponent>
        </MeshComponent>
    )
}