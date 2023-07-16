import { AbstractMesh, Color3, Mesh, Vector3 } from "@babylonjs/core";
import { Engine, Scene, useClick, useHover } from "react-babylonjs";
import Template from "./Template";
import { useState, MutableRefObject, useRef } from "react";
import { Inspector } from "../../inspector/src";

export function App() {
  const [url, setUrl] = useState("")
  const plane = useRef<Mesh>(null)
  useClick((e) => {
    console.log("hello")
  }, plane)

  return (
    <div>

      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="sample-canvas"
      >
        <Scene>
          <arcRotateCamera
            name="camera1"
            alpha={Math.PI / 2}
            beta={Math.PI / 4}
            radius={5}
            target={Vector3.Zero()}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
          />
          <transformNode name="group"
              rotation={new Vector3(Math.PI * 3 / 4, 0, Math.PI)}
          >
            <plane
              name="plane1"
              height={3}
              width={3}
              ref={plane}
            >
              <standardMaterial
                name="plane1-material"
                specularColor={Color3.White()}
                backFaceCulling={false}
              >
                {url && <texture
                  name="plane1-texture"
                  url={url}
                  assignTo="diffuseTexture"
                  hasAlpha={true}
                />}
              </standardMaterial>
            </plane>
            <plane
              name="back"
              height={3}
              width={3}
              position={new Vector3(0, 0, .1)}
            >
              <standardMaterial
                name="back-material"
                specularColor={Color3.Black()}
                diffuseColor={Color3.White()}
                backFaceCulling={false}
              />
            </plane>
          </transformNode>

        </Scene>
      </Engine>
      <Template setUrl={setUrl} />
    </div>
  )
}
