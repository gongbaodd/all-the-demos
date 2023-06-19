// import { ArcRotateCamera, HemisphericLight, Mesh, Scene, Engine, MeshBuilder, FreeCamera, PointLight, UniversalCamera } from "@babylonjs/core"
// import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui"
// import { toComponent } from "../utils/toComponent"

// export { Control }

// export const ArcRotateCameraComponent = toComponent(ArcRotateCamera)
// export type TArcRotateCamera = typeof ArcRotateCamera

// export const FreeCameraComponent = toComponent(FreeCamera)
// export type TFreeCamera = typeof FreeCamera

// export const HemisphericLightComponent = toComponent(HemisphericLight)
// export type THemisphericLight = typeof HemisphericLight

// export const PointLightComponent = toComponent(PointLight)
// export type TPointLight = typeof PointLight

// export const MeshComponent = toComponent(Mesh, MeshBuilder)
// export type TMesh = typeof Mesh
// export type TMeshBuilder = typeof MeshBuilder

// export const SceneComponent = toComponent(Scene)
// export type TScene = typeof Scene
// export type TSceneInstance = InstanceType<TScene>

// export const EngineComponent = toComponent(Engine)
// export type TEngine = typeof Engine
// export type TEngineInstance = InstanceType<TEngine>

// export const AdvancedDynamicTextureComponent = toComponent(AdvancedDynamicTexture)
// export type TAdvancedDynamicTexture = typeof AdvancedDynamicTexture

// export const ButtonComponent = toComponent(Button)
// export type TButton = typeof Button

// export const UniversalCameraComponent = toComponent(UniversalCamera)
// export type TUniversalCamera = typeof UniversalCamera

import { Engine as EngineComponent, Scene as SceneComponent } from "react-babylonjs"
import { Engine, Scene } from "@babylonjs/core"

EngineComponent.displayName = Engine.name
SceneComponent.displayName = Scene.name

export { EngineComponent, SceneComponent }