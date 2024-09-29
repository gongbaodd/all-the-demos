import { useCallback, useState, useSyncExternalStore, type MouseEventHandler } from "react"
import playerStore from "../../Models/playerStore"
import hexStore from "../../Models/hexStore";
import { TStep } from "../../Models/cardStore";

export default function Player({ name, playing, color }: { name: string, playing: boolean, color: string }) {
    const players = useSyncExternalStore(playerStore.subscribe, playerStore.getSnapshot)
    const [currentPlayer] = players.filter(player => player.name === name)

    type TCard = typeof currentPlayer.cards[0];

    const onCardPicked = useCallback((card: TCard) => () => {
        playerStore.chooseCard(card)
        playerStore.takeStep()
    }, [])

    return (
        <section>
            <h1 style={{ color }}>{name}: {playing ? "playing" : "waiting"}</h1>
            {currentPlayer.position && <div>
                Cards:
                <ul>
                    {
                        currentPlayer.cards.map((card, index) => {
                            return <li key={index}>
                                <button onClick={onCardPicked(card)} disabled={!playing}>{card?.name}</button>
                            </li>;
                        })
                    }
                </ul>
                {currentPlayer.chosenCard && <p>Chosen Card: <br />{currentPlayer.chosenCard.name}</p>}
            </div>}
            {!currentPlayer.position && <p>Please choose your starting position.</p>}
        </section>
    )
}