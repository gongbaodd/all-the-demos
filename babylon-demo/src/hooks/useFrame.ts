import BABYLON from '@babylonjs/core';
import { useEffect } from 'react';

type Callback = () => unknown;

interface IUseFrame {
    (engine: BABYLON.Engine | null, scene: BABYLON.Scene | null): void;
    (callback: Callback): void;
    callbacks: Callback[];
}

export const useFrame: IUseFrame = function(arg1, arg2?) {
    if (arg2 !== undefined) {
        const engine = arg1 as BABYLON.Engine | null;
        const scene = arg2 as BABYLON.Scene | null;

        useEffect(() => {
            if (engine && scene) {
                engine.runRenderLoop(() => {
                    useFrame.callbacks.forEach(cb => cb());
                    scene.render();
                })
            }
        }, [engine, scene]);

        return;
    }

    const callback = arg1 as Callback;

    useEffect(() => {
        useFrame.callbacks.push(callback);
        return () => {
            useFrame.callbacks = useFrame.callbacks.filter(cb => cb !== callback);
        }
    }, [callback]);
}

useFrame.callbacks = [];