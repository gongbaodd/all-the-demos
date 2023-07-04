import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Color3, Vector3 } from "@babylonjs/core";

export function App() {
  const mem = useMem()

  return (
    <div className="App">
      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="sample-canvas"
      >
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={mem(Vector3.Zero())}
            minZ={0.001}
            alpha={0}
            beta={Math.PI / 2}
            radius={5}
            lowerBetaLimit={2}
            upperBetaLimit={5}
          />
          <hemisphericLight
            name="light1"
            intensity={0.9}
            direction={mem(Vector3.Down())}
          />
          <sphere
            name="sphere1"
            segments={16}
            diameter={2}
          >
            <pbrMaterial
              name="pbr"
              albedoColor={mem(new Color3(1, 0.766, 0.336))}
              metallic={1.0}
              roughness={1.0}
              useRoughnessFromMetallicTextureAlpha={false}
              useRoughnessFromMetallicTextureGreen
              useMetallnessFromMetallicTextureBlue
            >
              <texture
                url="../assets/textures/mr.jpg"
                assignTo="metallicTexture"
              />
            </pbrMaterial>
          </sphere>
          <cubeTexture
            level={.5}
            assignTo="environmentTexture"
            rootUrl="../assets/textures/environment.env"
          />
        </Scene>
      </Engine>
    </div>
  )
}
