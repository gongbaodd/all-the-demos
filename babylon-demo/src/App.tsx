import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { useCallback, useState } from "react"
import { EngineComponent } from "./componets/Babylon"
import { Loading } from "./scenes/Loading"
import { Game } from "./scenes/Game"

export const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const onPlay = useCallback(() => {
        setIsLoading(false)
    }, [setIsLoading])

    return (
        <>
            <EngineComponent antialias canvasId="game">
                {isLoading ? <Loading /> : <Game />}
            </EngineComponent>
            <div style={{position: "absolute", top: 0}}>
                <button onClick={onPlay}>Play</button>
            </div>
        </>
    )
}
