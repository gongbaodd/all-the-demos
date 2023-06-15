import React, { FC, ReactNode, createContext, forwardRef, useContext, useEffect, useMemo } from "react";
import { Scene as BScene } from "@babylonjs/core"
import { EngineUtils } from "./Engine";
import { Canvas } from "./Canvas";
import { setForwardRef } from "../utils/ref"

interface IUtils {
    Context?: React.Context<BScene>
    useState: () => [BScene | null, React.Dispatch<React.SetStateAction<BScene | null>>]
    useRef: (setScene: React.Dispatch<React.SetStateAction<BScene | null>>) => (e: BScene) => void
}

const SceneUtils: IUtils = function() {}

SceneUtils.useState = () => React.useState<BScene | null>(null)

SceneUtils.useRef = (setScene) => React.useCallback((e: BScene) => setScene(e), [setScene])

export const Scene = forwardRef<BScene, {children: ReactNode}>(({children}, ref) => {
    const engine = useContext(EngineUtils.Context!);
    const scene = useMemo(() => {
        const s = new BScene(engine)
        SceneUtils.Context = createContext(s)
        return s
    }, [engine])
    const canvasEl = useContext(Canvas.Context!);

    if (!scene || !SceneUtils.Context || !canvasEl) return null

    useEffect(() => {
        setForwardRef(ref, scene)
    }, [scene])

    useEffect(() => {
        if (canvasEl) {
            const keydown = (ev: KeyboardEvent) => {
                if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "i") {
                    if (scene.debugLayer.isVisible()) {
                        scene.debugLayer.hide()
                    } else {
                        scene.debugLayer.show()
                    }
                }
            }

            canvasEl.addEventListener("keydown", keydown);
            return () => canvasEl.removeEventListener("keydown", keydown);
        }
    }, [canvasEl]);

    return (
        <SceneUtils.Context.Provider value={scene}>{children}</SceneUtils.Context.Provider>
    )
})

Scene.displayName = "Scene"
