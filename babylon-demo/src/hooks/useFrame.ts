import { useEffect } from 'react';
import { TEngineInstance, TSceneInstance } from '../componets/Babylon';

type Callback = () => unknown;

interface IUseFrame {
    (engine: TEngineInstance | null, scene: TSceneInstance | null): void;
    (callback: Callback): void;
    callbacks: Callback[];
}

export const useFrame: IUseFrame = function(arg1, arg2?) {
    const engine = arg1 as TEngineInstance | null;
    const scene = arg2 as TSceneInstance | null;

    useEffect(() => {
        if (engine && scene) {
            engine.runRenderLoop(() => {
                useFrame.callbacks.forEach(cb => cb());
                scene.render();
            })
        }
    }, [engine, scene]);

    const callback = arg1 as Callback;

    useEffect(() => {
        if (scene) return;

        useFrame.callbacks.push(callback);
        return () => {
            useFrame.callbacks = useFrame.callbacks.filter(cb => cb !== callback);
        }
    }, [callback, scene]);
}

useFrame.callbacks = [];