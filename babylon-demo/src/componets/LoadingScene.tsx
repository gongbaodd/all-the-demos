import React, { FC, useCallback, useContext, useState, forwardRef, ReactNode } from "react"
import { SceneComponent, FreeCameraComponent, EngineComponent, TScene, TFreeCamera, TEngine, TAdvancedDynamicTexture, AdvancedDynamicTextureComponent, ButtonComponent, TButton, Control } from './Babylon';
import { Color4, Vector3 } from "@babylonjs/core";
import { setForwardRef } from "../utils/ref"

type InsTScene = InstanceType<TScene>;
type InsTEngine = InstanceType<TEngine>;

type Props = { children?: ReactNode, onPlay: () => void }

export const LoadingScene = forwardRef<InsTScene, Props>(({ children, onPlay }, ref) => {
    const engine = useContext(EngineComponent.Context!)
    const [scene, setScene] = useState<InsTScene | null>(null)

    const initLoadingScene = useCallback(function (Scene: TScene, engine: InsTEngine) {
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        setScene(scene);
        setForwardRef(ref, scene)
        return scene;
    }, []);

    const initFreeCamera = useCallback((El: TFreeCamera, scene: InsTScene) => {
        const el = new El("CameraLoading", new Vector3(0, 0, 0), scene);
        el.setTarget(Vector3.Zero());
        return el;
    }, []);

    return (
        <SceneComponent initScene={initLoadingScene} engine={engine}>
            {scene && (
                <>
                    <FreeCameraComponent initNode={initFreeCamera} scene={scene} />
                    <GuiMenu onPlay={onPlay} />
                    {children}
                </>
            )}
        </SceneComponent>
    )
})

LoadingScene.displayName = "LoadingScene"

export const GuiMenu: FC<{ onPlay: Props["onPlay"] }> = ({ onPlay }) => {
    const [menu, setMenu] = useState<InstanceType<TAdvancedDynamicTexture> | null>(null)
    const scene = useContext(SceneComponent.Context!)
    const init = useCallback((Builder: TAdvancedDynamicTexture, scene: InsTScene) => {
        const guiMenu = Builder.CreateFullscreenUI("UI", false, scene)
        guiMenu.idealHeight = 720
        setMenu(guiMenu)
        return guiMenu
    }, [scene])

    const initStart = useCallback((Builder: TButton) => {
        const startBtn = Builder.CreateSimpleButton("start", "PLAY")
        startBtn.width = 0.2;
        startBtn.height = "40px"
        startBtn.color = "white"
        startBtn.top = "-14px"
        startBtn.thickness = 0
        startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
        startBtn.onPointerClickObservable.add(() => {
            onPlay()
        });
        menu?.addControl(startBtn);
        return startBtn
    }, [menu])

    return (
        <AdvancedDynamicTextureComponent
            initNode={init}
            scene={scene}
        >
            {!!menu && <ButtonComponent initNode={initStart} scene={scene} />}
        </AdvancedDynamicTextureComponent>
    )
}
