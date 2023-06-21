import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { EngineComponent } from "./componets/Babylon"
import { Loading } from "./scenes/Loading"
import { Game } from "./scenes/Game"
import { useSignal } from "@preact/signals-react"

export const App = () => {
    const isLoading = useSignal(true)
    const onPlay = () => {
        isLoading.value = false
    }

    console.log("render")

    return (
        <>
            <EngineComponent antialias canvasId="game">
                {isLoading.value ? <Loading /> : <Game />}
            </EngineComponent>
            <div style={{position: "absolute", top: 0}}>
                <button onClick={onPlay}>Play</button>
            </div>
        </>
    )
}
