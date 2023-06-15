import React, { FC, useContext, useEffect } from "react";
import { SceneUtils } from "./Scene";
import { HemisphericLight, Vector3, Scene as BScene } from "@babylonjs/core";
import { setForwardRef } from "../utils/ref";
// type LightParam = ConstructorParameters<typeof HemisphericLight>

interface Props {
  name: string;
  direction: Vector3;
  scene?: BScene;
}

export const Light = React.forwardRef<HemisphericLight,Props>(({ name, direction }, ref) => {
  const scene = useContext(SceneUtils.Context!);
  useEffect(() => {
    const light = new HemisphericLight(name, direction, scene);

    setForwardRef(ref, light);

    return () => {
      light.dispose();
    };
  }, [scene, name, direction]);

  return null;
});

Light.displayName = "Light"
