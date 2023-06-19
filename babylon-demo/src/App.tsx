import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { useCallback, useEffect, useRef, useState } from "react"
import { EngineComponent, SceneComponent } from "./componets/Babylon"
import { Loading } from "./scenes/Loading"

export const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const onPlay = useCallback(() => {
        setIsLoading(false)
    }, [setIsLoading])

    return (
        <EngineComponent antialias adaptToDeviceRatio canvasId="game">
            {isLoading ? <Loading /> : null}
        </EngineComponent>
    )
}
