import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Color3, DirectionalLight, Vector3 } from "@babylonjs/core";
import { useRef, useState } from "react";
import { Inspector } from "../../inspector/src";

export function App() {
  const mem = useMem()
  const [light, setLight] = useState<DirectionalLight | null>(null)
  return (
    <div style={{ flex: 1, display: "flex" }}>
      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="babylonJS"
      >
        <Scene>
          <Inspector />
          <ground
            name="ground1"
            width={15}
            height={15}
            subdivisions={2}
            receiveShadows
          />
          <arcRotateCamera
            name="camera1"
            target={mem(new Vector3(0, 1, 0))}
            alpha={0.5 - Math.PI / 2}
            beta={0.5 + Math.PI / 2}
            radius={15}
            minZ={0.001}
            wheelPrecision={50}
          />
          <hemisphericLight
            name="light1"
            intensity={.8}
            direction={mem(new Vector3(0, -1, 0))}
          />
          <directionalLight
            name="red-light"
            direction={mem(new Vector3(
              -5 * Math.PI / 4,
              -5 * Math.PI / 4,
              -Math.PI
            ))}
            intensity={8}
            diffuse={mem(Color3.Red())}
            specular={mem(Color3.Red())}
            ref={setLight}
          >
            <shadowGenerator
              mapSize={1024}
              useBlurExponentialShadowMap
              blurKernel={32}
              shadowCastChildren
            >
              <icoSphere
                name="ico1"
                position={mem(new Vector3(0, 2, 0))}
              />
            </shadowGenerator>
          </directionalLight>

          <utilityLayerRenderer>
            <gizmoManager
              thickness={3}
              positionGizmoEnabled
              rotationGizmoEnabled
            >
              <sphere
                name="sunMesh"
                diameter={1}
              >
                <lightGizmo
                  light={light ?? undefined}
                  updateScale
                />
              </sphere>
            </gizmoManager>
          </utilityLayerRenderer>
        </Scene>
      </Engine>
    </div>
  )
}
