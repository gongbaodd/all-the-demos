import { forwardRef, useCallback, useContext, useState } from "react";
import { AdvancedDynamicTextureComponent, ButtonComponent, EngineComponent, FreeCameraComponent, SceneComponent, TAdvancedDynamicTexture, TButton, TEngineInstance, TScene, TSceneInstance } from "./Babylon";
import { Color4, Vector3 } from "@babylonjs/core";

interface Props {
    goStart: () => void
}

export const LoseScene = forwardRef<TSceneInstance, Props>(({ goStart }) => {
    const engine = useContext(EngineComponent.Context!)
    const [scene, setScene] = useState<TSceneInstance | null>(null)
    const [menu, setMenu] = useState<InstanceType<TAdvancedDynamicTexture> | null>(null)

    const init = useCallback((Scene: TScene, engine: TEngineInstance) => {
        const _scene = new Scene(engine)
        _scene.clearColor = new Color4(0, 0, 0, 1)
        setScene(_scene)
        return _scene
    }, [])

    const initCamera = useCallback((FreeCamera: any, scene: TSceneInstance) => {
        const camera = new FreeCamera("LoseCamera", [0, 0, 0], scene)
        camera.setTarget(Vector3.Zero())
        return camera
    }, [])

    const initMenu = useCallback((Builder: TAdvancedDynamicTexture, scene: TSceneInstance) => {
        const guiMenu = Builder.CreateFullscreenUI("LoseMenu", false, scene)
        setMenu(guiMenu)
        return guiMenu
    }, [])

    const initButton = useCallback((Button: TButton) => {
        const button = Button.CreateSimpleButton("mainmenu", "Main Menu")
        button.width = 0.2
        button.height = "40px"
        button.color = "white"

        button.onPointerUpObservable.add(() => {
            goStart()
        });

        menu?.addControl(button)
        return button
    }, [menu, goStart])

    return (
    <SceneComponent initScene={init} engine={engine} >
        {scene && (
            <>
                <FreeCameraComponent initNode={initCamera} scene={scene!} />
                <AdvancedDynamicTextureComponent initNode={initMenu} scene={scene!} >
                    <ButtonComponent initNode={initButton} scene={scene!} />
                </AdvancedDynamicTextureComponent>
            </>
        )}
    </SceneComponent>
    );
})