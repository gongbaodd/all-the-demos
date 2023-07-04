import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { useEffect } from "react";
import { useScene } from "react-babylonjs";

export function useInspector() {
  const scene = useScene();
  useEffect(() => {
    if (!scene) return;
    scene.debugLayer.show();
  }, [scene]);
}


export function Inspector() {
  useInspector();
  return null;
}
