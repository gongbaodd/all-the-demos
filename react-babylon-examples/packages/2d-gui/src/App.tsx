import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { useCallback, useState } from "react";
import { AbstractMesh, Camera, Color3, Color4, Mesh, Texture, Vector3 } from "@babylonjs/core";
import { Control } from "@babylonjs/gui";

const DEFAULT_BOXES = [
  {
    name: "red",
    position: new Vector3(-2.5, 1, 0),
    color: Color3.Red(),
    index: 1,
  },
  {
    name: "green",
    position: new Vector3(2.5, 1, 0),
    color: Color3.Green(),
    index: 2,
  },
  {
    name: "blue",
    position: new Vector3(0, 1, 0),
    color: Color3.Blue(),
    index: 3,
  },
]

export function App() {
  const mem = useMem()
  const [clearColor, setClearColor] = useState(
    new Color4(.5, .5, .5, .5)
  )
  const [boxes, setBoxes] = useState(DEFAULT_BOXES)
  const [clickedMeshName, setClickedMeshName] = useState("")

  const [showModal, setShowModal] = useState(false)

  const onMeshPicked = useCallback((mesh: AbstractMesh) => {
    const matchingBox = boxes.find((box) => box.name === mesh.name)
    if (!matchingBox) return
    setClickedMeshName(matchingBox.name)
    setShowModal(true)
    setClearColor(Color4.FromColor3(matchingBox.color, 1))
  }, [boxes])

  const onModalCreated = useCallback((p: Mesh) => {
    if (!p._scene || !p._scene.activeCamera) return
    const { activeCamera } = p._scene
    const forwardRayDirection = activeCamera.getForwardRay().direction
    p.position = activeCamera.position.add(forwardRayDirection.scale(
      1.5 / activeCamera.fov
    ))
    p.lookAt(activeCamera.position, 0, Math.PI, Math.PI)
  }, [])

  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="sample-canvas"
    >
      <Scene
        clearColor={clearColor}
        onMeshPicked={onMeshPicked}
      >
        <arcRotateCamera
          name="camera1"
          radius={7}
          beta={Math.PI / 4}
          alpha={Math.PI / 2}
          target={mem(Vector3.Zero())}
          minZ={.001}
          wheelPrecision={30}
        />
        <hemisphericLight
          name="light1"
          intensity={.7}
          direction={mem(Vector3.Up())}
        />
        <vrExperienceHelper
          webVROptions={{ createDeviceOrientationCamera: false }}
          enableInteractions
        />
        {boxes.map((box) => (
          <box
            key={box.index}
            size={2}
            name={box.name}
            position={box.position}
          >
            <standardMaterial
              name={`${box.name}-mat`}
              diffuseColor={box.color}
              specularColor={Color3.Black()}
            />
          </box>
        ))}
        {showModal && <plane
          name="dialog"
          width={3}
          height={1}
          rotation={mem(new Vector3(0, Math.PI, 0))}
          onCreated={onModalCreated}
        >
          <advancedDynamicTexture
            name="dialogTexture"
            height={1024}
            width={1024}
            createForParentMesh
            generateMipMaps
            samplingMode={Texture.TRILINEAR_SAMPLINGMODE}
          >
            <rectangle
              name="rect-1"
              background="white"
              color="#666666"
              height={1 / 3}
              width={1}
              scaleY={3}
              scaleX={1}
              thickness={2}
              cornerRadius={12}
            >
              <Header />
              <Body boxes={boxes} />
              <Footer />
            </rectangle>
          </advancedDynamicTexture>
        </plane>}
      </Scene>
    </Engine>
  )
}

function Header() {
  return (
    <stackPanel
      name="header-stack-panel"
      isVertical={false}
      width="100%"
    >
      <textBlock
        name="selection-mode"
        text="Selection Mode"
        color="black"
        fontSize={28}
        fontStyle="bold"
        paddingLeft={"20px"}
        textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
        textVerticalAlignment={Control.VERTICAL_ALIGNMENT_CENTER}
      />
      <babylon-button
        name="close-button"
        width="1000px"
        paddingLeft="950px"
        height="80px"
        onPointerDownObservable={() => { }}
      >
        <textBlock
          text="\uf00d"
          fontFamily="FontAwesome"
          fontSize={24}
          fontStyle="bold"
          color="black"
          textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_CENTER}
          textVerticalAlignment={Control.VERTICAL_ALIGNMENT_CENTER}
        />
      </babylon-button>
    </stackPanel>
  )
}

function Body(props: { boxes: typeof DEFAULT_BOXES }) {
  const { boxes } = props
  return (
    <rectangle
      name="body-rectangle"
      height="200px"
      thickness={2}
      color="#EEEEEE"
    >
      <stackPanel name="sp-3">
        <textBlock
          name="description"
          key={"body-"}
          text={`You have clicked on .\n...${boxes.length} remaining.`}
          color="black"
          fontSize={28}
          textWrapping
          height="100px"
          textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
          textVerticalAlignment={Control.VERTICAL_ALIGNMENT_CENTER}
          paddingLeft="10px"
          paddingTop="10px"
        />
        {boxes.map((box) => (
          <textBlock
            key={"opt-" + box.name}
            text={box.name}
            color="black"
            fontSize={28}
            height={90 / boxes.length + "px"}
            textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
            textVerticalAlignment={Control.VERTICAL_ALIGNMENT_CENTER}
            paddingTop="20px"
          />
        ))}
      </stackPanel>
    </rectangle>
  )
}

function Footer() {
  return (
    <stackPanel
      name="footer-stack-panel"
      height="80px"
      paddingTop="10px"
      paddingBottom="10px"
      isVertical={false}
      horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_RIGHT}
      verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
    >
      <babylon-button
        name="cancel-button"
        background="#6c757d"
        width="290px"
        height="60px"
        cornerRadius={10}
        onPointerDownObservable={() => { }}
      >
        <textBlock
          name="cancel-text"
          text="Cancel"
          fontSize={28}
          fontStyle="bold"
          color="white"
        />
      </babylon-button>

      <babylon-button
        name="delete-button"
        background="#dc3545"
        paddingLeft="50px"
        paddingRight="30px"
        width="350px"
        height="60px"
        cornerRadius={10}
        onPointerClickObservable={() => { }}
      >
        <textBlock
          name="delete-text"
          text="Delete"
          fontSize={28}
          fontStyle="bold"
          color="white"
          textVerticalAlignment={Control.VERTICAL_ALIGNMENT_CENTER}
        />
      </babylon-button>

    </stackPanel>
  )
}
