import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Vector3 } from "@babylonjs/core";
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
} from "./componets/Babylon";

enum State {
  START = 0,
  GAME = 1,
  LOSE = 2,
  CUTSCENE = 3,
}

type InsTEngine = InstanceType<TEngine>;
type InsTScene = InstanceType<TScene>;

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [engine, setEngine] = useState<InsTEngine | null>(null);
  const [scene, setScene] = useState<InsTScene | null>(null);

  useFrame(engine, scene);

  useEffect(() => {
    if (scene) {
      scene.debugLayer.show();
    }
  }, [scene]);

  const canvasRef = useCallback(
    (el: HTMLCanvasElement) => {
      el && setCanvas(el);
    },
    [setCanvas]
  );

  const initEngine = useCallback(
    (Engine: TEngine, canvas: HTMLCanvasElement) => {
      const engine = new Engine(canvas, true);
      setEngine(engine);
      return engine;
    },
    []
  );

  const initScene = useCallback((Scene: TScene, engine: InsTEngine) => {
    const scene = new Scene(engine);
    setScene(scene);
    return scene;
  }, []);

  const initCamera = useCallback((El: TArcRotateCamera, scene: InsTScene) => {
    const halfPI = Math.PI / 2;
    const el = new El("camera", halfPI, halfPI, 2, Vector3.Zero(), scene);
    el.attachControl(scene, true);
    return el;
  }, []);

  const initLight = useCallback((El: THemisphericLight, scene: InsTScene) => {
    const el = new El("light", new Vector3(1, 1, 0), scene);
    return el;
  }, []);

  const initSphere = useCallback(
    (_: TMesh, scene: InsTScene, builder?: TMeshBuilder) => {
      const el = builder!.CreateSphere("sphere", { diameter: 1 }, scene);
      return el;
    },
    []
  );

  // useEffect(() => {
  //     if (engine && scene) {
  //         engine.displayLoadingUI()
  //         scene.detachControl()
  //         let nscene = new BABYLON.Scene(engine)
  //         nscene.clearColor = new BABYLON.Color4(0,0,0,1)
  //         let ncamera = new FreeCamera("camera1", new Vector3(0,0,0), nscene)
  //         ncamera.setTarget(Vector3.Zero())
  //     }
  // }, [engine, scene])

  return (
    <canvas
      ref={canvasRef}
      id="game"
      style={{ width: "100%", height: "100%" }}
      tabIndex={0}
    >
      {canvas && (
        <EngineComponent canvas={canvas} initEngine={initEngine}>
          {!isLoading && (
            <SceneComponent initScene={initScene} engine={engine!}>
              <ArcRotateCameraComponent initNode={initCamera} scene={scene!} />
              <HemisphericLightComponent initNode={initLight} scene={scene!} />
              <MeshComponent initNode={initSphere} scene={scene!} />
            </SceneComponent>
          )}
        </EngineComponent>
      )}
    </canvas>
  );
};
