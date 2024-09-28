import { useEffect, useSyncExternalStore } from "react"
import cardStore from "../../Models/cardStore"
import playerStore from "../../Models/playerStore"

export default function Player({ name, playing, color }: { name: string, playing: boolean, color: string }) {
    const cards = useSyncExternalStore(cardStore.subscribe, cardStore.getSnapshot)
    const players = useSyncExternalStore(playerStore.subscribe, playerStore.getSnapshot)
    const [currentPlayer] = players.filter(player => player.name === name)

    return (
        <section>
            <h1 style={{ color }}>{name}: {playing ? "playing" : "waiting"}</h1>
            <div>
                Cards:
                <ul>
                    {
                        currentPlayer.cards.map(card => <li>{card?.name}</li>)
                    }
                </ul>
            </div>
        </section>
    )
}