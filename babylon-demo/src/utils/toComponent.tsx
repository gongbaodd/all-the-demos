import { ArcRotateCamera, HemisphericLight, Mesh, Scene, Engine, MeshBuilder, FreeCamera } from "@babylonjs/core";
import React, { forwardRef, useEffect, useState } from "react";
import { setForwardRef } from "./ref";

const BABYLON = {
  ArcRotateCamera,
  HemisphericLight,
  Mesh,
  Scene,
  Engine,
  MeshBuilder
}

type NodeConstructor =
  | typeof BABYLON.ArcRotateCamera
  | typeof BABYLON.HemisphericLight
  | typeof BABYLON.Mesh
  | typeof BABYLON.Scene
  | typeof BABYLON.Engine
  | typeof FreeCamera

type TMeshBuilder = typeof BABYLON.MeshBuilder;

interface Props<T extends NodeConstructor> {
  initNode: (
    Constructor: T,
    scene: Scene,
    Builder?: TMeshBuilder
  ) => InstanceType<T>;
  scene: Scene;
  children?: React.ReactNode;
}

type TScene = typeof BABYLON.Scene;
interface SceneProps {
  initScene: (
    Constructor: TScene,
    engine: Engine
  ) => InstanceType<TScene>;
  engine: Engine;
  children?: React.ReactNode;
}

type TEngine = typeof BABYLON.Engine;
interface EngineProps {
  initEngine: (
    Constructor: TEngine,
    canvas: HTMLCanvasElement
  ) => InstanceType<TEngine>;
  canvas: HTMLCanvasElement;
  children?: React.ReactNode;
}

export const toComponent = function <T extends NodeConstructor>(
  Constructor: T
) {
  type Ref = InstanceType<T>;
  type ComProps = Props<T> | SceneProps | EngineProps;
  type ForwardComponent = typeof forwardRef<Ref, ComProps>;
  interface IComponent extends ReturnType<ForwardComponent> {
    Context?: React.Context<Ref>;
  }

  const isScene = Constructor.name === "Scene";
  const isEngine = Constructor.name === "Engine";
  const isMesh = Constructor.name === "Mesh";

  const Component: IComponent = forwardRef<Ref, ComProps>((props, ref) => {
    const { children } = props;

    const normProps = props as Props<T>;
    const { scene } = normProps;

    const sceneProps = props as SceneProps;
    const { engine } = sceneProps;

    const engineProps = props as EngineProps;
    const { canvas } = engineProps;

    const [node, _setNode] = useState<Ref | null>(null);
    const setNode = (node: Ref) => {
      // This must be an atomic operation
      Component.Context = React.createContext(node);
      setForwardRef(ref, node);
      _setNode(node);
    };

    // Normal node
    useEffect(() => {
      if (scene && !isScene && !isEngine) {
        const { initNode } = normProps;
        const node = initNode(
          Constructor,
          scene,
          isMesh ? BABYLON.MeshBuilder : undefined
        ) as Ref;

        setNode(node);
        return () => node?.dispose();
      }
    }, [scene]);

    // Scene
    useEffect(() => {
      if (engine && isScene) {
        const { initScene } = sceneProps;
        const Con = Constructor as typeof BABYLON.Scene;
        const node = initScene(Con, engine) as Ref;
        setNode(node);
        return () => node?.dispose();
      }
    }, [engine]);

    // Engine
    useEffect(() => {
      if (canvas && isEngine) {
        const { initEngine } = engineProps;
        const Con = Constructor as typeof BABYLON.Engine;
        const node = initEngine(Con, canvas) as Ref;
        setNode(node);
        return () => node?.dispose();
      }
    }, [canvas]);

    if (children && Component.Context && node) {
      return (
        <Component.Context.Provider value={node}>
          {children}
        </Component.Context.Provider>
      );
    }

    return null;
  });
  Component.displayName = Constructor.name;

  return Component;
};
