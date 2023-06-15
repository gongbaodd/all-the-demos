import React, { FC, ForwardRefExoticComponent, MutableRefObject, ReactNode, RefAttributes, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Engine as BEngine } from "@babylonjs/core"
import { Canvas } from "./Canvas";
import { setForwardRef } from "../utils/ref";

interface IUtils {
    Context?: React.Context<BEngine>
    useState: () => [BEngine | null, React.Dispatch<React.SetStateAction<BEngine | null>>]
    useRef: (setEngine: React.Dispatch<React.SetStateAction<BEngine | null>>) => (e: BEngine) => void
}
export const EngineUtils: IUtils = function() {}

EngineUtils.useState = () => useState<BEngine | null>(null) 

EngineUtils.useRef = (setEngine) => useCallback((e: BEngine) => setEngine(e), [setEngine])

type Props = {
    children: ReactNode
}

interface IEngine extends ForwardRefExoticComponent<Props & RefAttributes<BEngine>>  {}

export const Engine: IEngine = React.forwardRef<BEngine, Props>(({children}, ref) => {
    const canvas = useContext(Canvas.Context!)
    const engine = useMemo(() =>{
        const e = new BEngine(canvas, true)
        EngineUtils.Context = createContext<BEngine>(e);
        return e
    }, [canvas])

    useEffect(() => {
        setForwardRef(ref, engine)
    }, [engine])

    if (!engine || !EngineUtils.Context) return <></>

    return <EngineUtils.Context.Provider value={engine}>{children}</EngineUtils.Context.Provider>
})

Engine.displayName = "Engine"

