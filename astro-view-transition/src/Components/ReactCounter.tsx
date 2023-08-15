import { useCallback, useEffect, useState } from "react";

const ReactCounter = () => {
    const [count, setCount] = useState(0);

    const increment = useCallback(() => {
        setCount(c => c + 1);
    }, [])
    const decrement = useCallback(() => {
        setCount(c => c - 1);
    }, [])

    useEffect(() => {
        console.log("ReactCounter mounted");
        return () => {
            console.log("ReactCounter unmounted");
        }
    }, [])

    return (
        <div>
            <h1>React Counter</h1>
            <button onClick={increment}>+</button>
            <span>{count}</span>
            <button onClick={decrement}>-</button>
        </div>
    )
}

export default ReactCounter;