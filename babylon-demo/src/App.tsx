import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Color4, Vector3 } from "@babylonjs/core";
import { useFrame } from "./hooks/useFrame";
import {
  TArcRotateCamera,
  ArcRotateCameraComponent,
  THemisphericLight,
  HemisphericLightComponent,
  TMesh,
  MeshComponent,
  TMeshBuilder,
  TScene,
  SceneComponent,
  TEngine,
  EngineComponent,
  TFreeCamera,
  FreeCameraComponent,
} from "./componets/Babylon";
import { LoadingScene } from "./scenes/LoadingScene";
import { useResize } from "./hooks/useResize"
import { GameScene } from "./scenes/GameScene";

type InsTEngine = InstanceType<TEngine>;
type InsTScene = InstanceType<TScene>;

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [engine, setEngine] = useState<InsTEngine | null>(null);
  const [scene, setScene] = useState<InsTScene | null>(null);

  const canvasRef = useCallback((el: HTMLCanvasElement) => {
    el && setCanvas(el);
  }, []);

  const initEngine = useCallback(
    (Engine: TEngine, canvas: HTMLCanvasElement) => {
      const engine = new Engine(canvas, true);
      setEngine(engine);
      return engine;
    },
    []
  );

  const useScene = useCallback((scene: InsTScene) => {
    setScene(scene)
  }, [])

  const onPlay = useCallback(() => {
    setIsLoading(false);
  }, [])

  useEffect(() => {
    if (scene) {
      scene.debugLayer.show();
    }
  }, [scene]);

  // Loading
  useEffect(() => {
    if (engine && scene && isLoading) {
      const load = async () => {
        engine.displayLoadingUI();
        await scene.whenReadyAsync();
        engine.hideLoadingUI();
      };
      load();
    }
  }, [engine, scene, isLoading]);

  useFrame(engine, scene);
  useResize(engine);

  return (
    <canvas
      ref={canvasRef}
      id="game"
      style={{ width: "100%", height: "100%" }}
      tabIndex={0}
    >
      {canvas && (
        <EngineComponent canvas={canvas} initEngine={initEngine}>
          {isLoading && (
            <LoadingScene ref={useScene} onPlay={onPlay} />
          )}
          {!isLoading && (
            <GameScene ref={useScene} />
          )}
        </EngineComponent>
      )}
    </canvas>
  );
};
