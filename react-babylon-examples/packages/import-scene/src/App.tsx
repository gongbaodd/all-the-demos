import { BabylonFileLoaderConfiguration, Vector3, Scene as BS } from "@babylonjs/core";
import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Engine, Scene, useScene } from "react-babylonjs";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import * as CANNON from "cannon-es";
import { Inspector } from "../../inspector/src/index";
import { future } from "../../future/src/index";

BabylonFileLoaderConfiguration.LoaderInjectedPhysicsEngine = CANNON;

export function App() {
  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="sample-canvas"
    >
      <Scene>
        <Suspense fallback={
          <>
            <freeCamera
              name="camera1"
              position={new Vector3(0, 1.7, -7)}
              setTarget={[Vector3.Zero()]}
            />
            <hemisphericLight
              name="light1"
              intensity={0.7}
              direction={Vector3.Up()}
            />
          </>
        }>
          <ImportedScene />
        </Suspense>

      </Scene>
    </Engine>
  )
}

const rootUrl = "./scenes/_assets/";
const use = future<BS>();

export function ImportedScene() {
  // return null
  const scene = use(() => SceneLoader.AppendAsync(rootUrl, "../scene/scene.babylon"))

  scene?.activeCamera?.attachControl()

  return <Inspector />;
}
