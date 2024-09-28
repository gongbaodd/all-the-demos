import { useSyncExternalStore } from "react"
import playerStore from "../../Models/playerStore"

export default function Player({ name, playing, color }: { name: string, playing: boolean, color: string }) {
    const players = useSyncExternalStore(playerStore.subscribe, playerStore.getSnapshot)

    const [currentPlayer] = players.filter(player => player.name === name)

    return (
        <section>
            <h1 style={{ color }}>{name}: {playing ? "playing" : "waiting"}</h1>
            {currentPlayer.position && <div>
                Cards:
                <ul>
                    {
                        currentPlayer.cards.map((card, index) => <li key={index}>{card?.name}</li>)
                    }
                </ul>
            </div>}
            {!currentPlayer.position && <p>Please choose your starting position.</p>}
        </section>
    )
}