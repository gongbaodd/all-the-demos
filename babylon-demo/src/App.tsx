import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { EngineComponent } from "./componets/Babylon"
import { Loading } from "./scenes/Loading"
import { Game } from "./scenes/Game"
import { signal } from "@preact/signals-react"
import { Suspense } from "react"

const isLoading = signal(true)

const onPlay = () => {
    isLoading.value = false
}

export const App = () => {
    return (
        <Suspense fallback="loading">
            <EngineComponent antialias canvasId="game">
                {isLoading.value ? <Loading /> : <Game />}
            </EngineComponent>
            <div style={{position: "absolute", top: 0}}>
                <button onClick={onPlay}>Play</button>
            </div>
        </Suspense>
    )
}
