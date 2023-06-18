import { forwardRef, useCallback, useContext, useState } from "react";
import { AdvancedDynamicTextureComponent, ButtonComponent, Control, EngineComponent, FreeCameraComponent, SceneComponent, TAdvancedDynamicTexture, TButton, TEngineInstance, TScene, TSceneInstance } from "./Babylon";
import { Color4, Vector3 } from "@babylonjs/core";

interface Props {
    toGame: () => void
}

export const CutScene = forwardRef<TSceneInstance, Props>(({ toGame }) => {
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
        const camera = new FreeCamera("cutSceneCamera", [0, 0, 0], scene)
        camera.setTarget(Vector3.Zero())
        return camera
    }, [])

    const initMenu = useCallback((Builder: TAdvancedDynamicTexture, scene: TSceneInstance) => {
        const guiMenu = Builder.CreateFullscreenUI("cutSceneMenu", false, scene)
        setMenu(guiMenu)
        return guiMenu
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
        next.onPointerClickObservable.add(() => {
            toGame()
        });
        menu?.addControl(next);
        return next
    }, [menu, toGame])

    return (
    <SceneComponent initScene={init} engine={engine} >
        {scene && <>
            <FreeCameraComponent initNode={initCamera} scene={scene!} />
            <AdvancedDynamicTextureComponent initNode={initMenu} scene={scene!} >
                {menu && <ButtonComponent initNode={initNext} scene={scene!} />}
            </AdvancedDynamicTextureComponent>
        </>}
    </SceneComponent>
    );
})