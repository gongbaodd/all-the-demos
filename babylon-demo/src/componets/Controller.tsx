import { ActionManager, ExecuteCodeAction, Scalar } from "@babylonjs/core";
import { FC, useCallback, useMemo, useState } from "react";
import { useScene } from "react-babylonjs";

interface Props {
    children: React.ReactNode
}

export const Controller: FC<Props> = ({ children }) => {
    const scene = useScene()
    
    const keyMap = useMemo(() => new Map<string, boolean>(), [])
    
    const actionManager = useMemo(() => {
        if (!scene) return
        const am = new ActionManager(scene)
        const keyDown = new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            keyMap.set(evt.sourceEvent.key, evt.sourceEvent.type === "keydown")
        });
        const keyUp = new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            keyMap.set(evt.sourceEvent.key, evt.sourceEvent.type === "keydown")
        });
        am.registerAction(keyDown)
        am.registerAction(keyUp)
        return am
    }, [scene])


    const [vertical, setVertical] = useState(0)
    const [_verticalAxis, setVerticalAxis] = useState(0)
    const [horizontal, setHorizontal] = useState(0)
    const [_horizontalAxis, setHorizontalAxis] = useState(0)
 
    const updateFromKeybaord = useCallback(() => {
        if (keyMap.get("ArrowUp")) {
            setVertical(Scalar.Lerp(vertical, 1, 0.2))
            setVerticalAxis(1)
        } else if (keyMap.get("ArrowDown")) {
            setVertical(Scalar.Lerp(vertical, -1, 0.2))
            setVerticalAxis(-1)
        } else {
            setVertical(0)
            setVerticalAxis(0)
        }

        if (keyMap.get("ArrowLeft")) {
            setHorizontal(Scalar.Lerp(horizontal, -1, 0.2))
            setHorizontalAxis(-1)
        } else if (keyMap.get("ArrowRight")) {
            setHorizontal(Scalar.Lerp(horizontal, 1, 0.2))
            setHorizontalAxis(1)
        } else {
            setHorizontal(0)
            setHorizontalAxis(0)
        }

    }, [keyMap, vertical, horizontal])
    
    return children;
}