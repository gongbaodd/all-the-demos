import { ReactNode, useEffect } from "react"
import { useScene } from "react-babylonjs"

export const debugLayer = (children: ReactNode) => {
    const scene = useScene()

    useEffect(() => {
        if (scene) {
            scene.debugLayer.show()
        }
    }, [scene])

    return children
}