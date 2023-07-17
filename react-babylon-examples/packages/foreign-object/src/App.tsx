import { AbstractMesh, Color3, Mesh, Vector3, Texture } from "@babylonjs/core";
import { Engine, Scene, useBeforeRender, useClick, useHover } from "react-babylonjs";
import Template from "./Template";
import { useState, MutableRefObject, useRef, useEffect } from "react";
import { Inspector } from "../../inspector/src";
import { toSvg } from "../../html-to-image/src";
import { htmlevent } from "./html"

export function App() {
  const dom = useRef<HTMLDivElement | null>(null)

  return (
    <div>
      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="sample-canvas"
      >
        <Scene>
          {/* <Inspector /> */}
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
          <Stage dom={dom} />
        </Scene>
      </Engine>
      <Template ref={dom} />
    </div>
  )
}

export function Stage(props: { dom: MutableRefObject<HTMLDivElement | null> }) {
  const plane = useRef<Mesh>(null)
  const [url, setUrl] = useState<string>("")
  useClick((e) => {
  }, plane)

  useBeforeRender(() => {
    if (!props.dom.current) return

    if (!url) {
      toSvg(props.dom.current).then(_url => {
        if (url !== _url) setUrl(_url)
      })
    }

  }, undefined, undefined, undefined, [props.dom, url])

  return (
    <transformNode name="group"
      rotation={new Vector3(Math.PI * 3 / 4, 0, Math.PI)}
    >
      <plane
        name="plane1"
        height={3}
        width={3}
        ref={plane}
      >
        <advancedDynamicTexture
          name="plane1-texture"
          createForParentMesh
          generateMipMaps
          samplingMode={Texture.TRILINEAR_SAMPLINGMODE}
          width={1024}
          height={1024}
        >
          {url && <babylon-image
            name="plane1-image"
            url={url}
            onPointerMoveObservable={e => {
            }}
            onPointerClickObservable={e => {
              const { current: element } = props.dom;
              if (!element) return
              // htmlevent(props.dom.current, "click", e.x, e.y)
              const clientX = ( e.x/1024 * element.offsetWidth ) + element.offsetLeft;
              const clientY = ( e.y/1024 * element.offsetHeight ) + element.offsetTop;
              console.log(clientX, clientY)

              element.ownerDocument?.elementFromPoint(clientX, clientY)?.click()


            }}
          />}
        </advancedDynamicTexture>
        {/* <standardMaterial
                name="plane1-material"
                specularColor={Color3.White()}
                backFaceCulling={false}
              >
                {props.url && <texture
                  name="plane1-texture"
                  url={props.url}
                  assignTo="diffuseTexture"
                  hasAlpha={true}
                />}
              </standardMaterial> */}
      </plane>
      <plane
        name="back"
        height={3}
        width={3}
        position={new Vector3(0, 0, .2)}
      >
        <standardMaterial
          name="back-material"
          specularColor={Color3.Black()}
          diffuseColor={Color3.White()}
          backFaceCulling={false}
        />
      </plane>
    </transformNode>
  )
}
