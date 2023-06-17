import { Control, AdvancedDynamicTextureComponent, SceneComponent, TAdvancedDynamicTexture, TScene, ButtonComponent, TButton } from "./Babylon"
import React, { FC, useCallback, useContext } from "react"

type InsTScene = InstanceType<TScene>
type TButtonInstance = InstanceType<TButton>

type props = {}

const Buttons: FC<props> = () => {
    const scene = useContext(SceneComponent.Context!)
    const gui = useContext(AdvancedDynamicTextureComponent.Context!)
    const initStart = useCallback((Builder: TButton) => {
        const startBtn = Builder.CreateSimpleButton("start", "PLAY")
        startBtn.width = 0.2;
        startBtn.height = "40px"
        startBtn.color = "white"
        startBtn.top = "-14px"
        startBtn.thickness = 0
        startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
        startBtn.onPointerClickObservable.add(() => {});
        gui.addControl(startBtn);
        return startBtn
    }, [gui])

    const initMain = useCallback((Builder: TButton) => {
        const mainBtn = Builder.CreateSimpleButton("main menu", "MAIN MENU");
        mainBtn.width = 0.2;
        mainBtn.height = "40px"
        mainBtn.color = "white"
        mainBtn.onPointerClickObservable.add(() => {});
        gui.addControl(mainBtn);
        return mainBtn
    }, [])

    const initNext = useCallback((Builder: TButton) => {
        const next = Builder.CreateSimpleButton("next", "NEXT");
        next.color
        next.thickness = 0
        next.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
        next.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
        next.width = "64px"
        next.height = "64px"
        next.top = "-3%"
        next.left = "-12%"
        next.onPointerClickObservable.add(() => {});
        gui.addControl(next);
        return next
    }, [])

    return (
        <>
            <ButtonComponent initNode={initStart} scene={scene} />
            <ButtonComponent initNode={initMain} scene={scene} />
        </>
    )
}


export const GuiMenu = () => {
    const scene = useContext(SceneComponent.Context!)
    const init = useCallback((Builder: TAdvancedDynamicTexture, scene: InsTScene) => {
        const guiMenu = Builder.CreateFullscreenUI("UI", false, scene)
        return guiMenu
    }, [scene])

    return (
        <AdvancedDynamicTextureComponent
            initNode={init}
            scene={scene}
        >
            <Buttons/>
        </AdvancedDynamicTextureComponent>
    )
}
