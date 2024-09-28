export default function Player({ name, playing, color }: { name: string, playing: boolean, color: string }) {
    return (
        <section>
            <h1 style={{color}}>{name}: {playing ? "playing": "waiting"}</h1>
            <p>
                Cards:
                <ul>
                    <li>walk 3 block</li>
                    <li>walk jump walk</li>
                    <li>jump 3 block</li>
                </ul>
            </p>
        </section>
    )
}