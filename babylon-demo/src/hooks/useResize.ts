import { useEffect } from "react";
import { TEngineInstance } from "../componets/Babylon";

export const useResize = function(engine: TEngineInstance | null) {
    useEffect(() => {
        if (!engine) return

        const onResize = () => {
            engine.resize()
        }

        window.addEventListener('resize', onResize)

        return () => window.removeEventListener('resize', onResize)

    }, [engine])
}