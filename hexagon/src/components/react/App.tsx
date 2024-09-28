import Player from "./Player";
import { Stage } from "./Stage";
import playerStore from "../../Models/playerStore";
import { useSyncExternalStore } from "react";

export default function App() {
    const players = useSyncExternalStore(playerStore.subscribe, playerStore.getSnapshot)

    return <>
        <div className="player">
            {
                players.map((player) => (
                    <Player key={player.name} name={player.name} playing={player.playing} color={player.color.medium} />
                ))
            }
        </div>
        <Stage />
    </>
}