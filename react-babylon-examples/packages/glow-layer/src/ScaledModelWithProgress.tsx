import { Color3, Vector3, Matrix } from "@babylonjs/core";
import { Suspense, useContext, useEffect, useRef } from "react";
import { ILoadedModel, Model, SceneContext, SceneLoaderContextProvider } from "react-babylonjs";

export function ProgressFallback(props: {
    rotation: Vector3,
    center: Vector3,
    scaleTo: number,
    progressBarColor: Color3
}) {
    const sceneCtx = useContext(SceneContext)
    const loadProgress = useRef(0)
    useEffect(() => {
        if (!sceneCtx) return
        const ctx = sceneCtx as any
        if (!ctx.lastProgress) return

        const progress = ctx.lastProgress
        loadProgress.current = progress.lengthComputable ?
            progress.loaded / progress.total :
            progress.loaded / 10000000
    }, [])

    return (
        <transformNode
            name="load-mesh"
            rotation={props.rotation}
            position={props.center}
        >
            <box
                name="box"
                height={props.scaleTo / 15}
                width={props.scaleTo}
                depth={props.scaleTo / 30}
                scaling={
                    new Vector3(loadProgress.current, 0, 0)
                }
                position={
                    new Vector3(props.scaleTo / 2, 0, props.scaleTo / 60)
                }
                setPivotMatrix={[
                    Matrix.Translation(-props.scaleTo / 2, 0, 0)
                ]}
                setPreTransformMatrix={[
                    Matrix.Translation(props.scaleTo / 2, 0, 0)
                ]}
            >
                <standardMaterial
                    name="mat"
                    diffuseColor={props.progressBarColor}
                    specularColor={Color3.Black()}
                />
            </box>
            <box
                name="box"
                height={props.scaleTo / 15}
                width={props.scaleTo}
                depth={props.scaleTo / 30}
                position={
                    new Vector3(0, 0, props.scaleTo / -60)
                }
            />
        </transformNode>
    )
}

export function ScaledModelWithProgress(props: {
    progressBarColor: Color3,
    progressRotation?: Vector3,
    modalRotation?: Vector3,
    center: Vector3,
    scaleTo: number,
    rootUrl: string,
    sceneFilename: string,
    onModelLoaded?: (model: ILoadedModel) => void
}) {
    return (
        <SceneLoaderContextProvider>
            <Suspense
                fallback={
                    <ProgressFallback
                        progressBarColor={props.progressBarColor}
                        rotation={props.progressRotation ?? Vector3.Zero()}
                        center={props.center}
                        scaleTo={props.scaleTo}
                    />
                }
            >
                <Model
                    name="model"
                    reportProgress
                    position={props.center}
                    rootUrl={props.rootUrl}
                    sceneFilename={props.sceneFilename}
                    scaleToDimension={props.scaleTo}
                    onModelLoaded={props.onModelLoaded}
                    rotation={props.modalRotation}
                />
            </Suspense>
        </SceneLoaderContextProvider>
    )
}