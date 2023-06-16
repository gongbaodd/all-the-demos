import { ArcRotateCamera, HemisphericLight, Mesh, Scene, Engine, MeshBuilder } from "@babylonjs/core"
import { toComponent } from "../utils/toComponent"

export const ArcRotateCameraComponent = toComponent(ArcRotateCamera)
export type TArcRotateCamera = typeof ArcRotateCamera

export const HemisphericLightComponent = toComponent(HemisphericLight)
export type THemisphericLight = typeof HemisphericLight

export const MeshComponent = toComponent(Mesh)
export type TMesh = typeof Mesh
export type TMeshBuilder = typeof MeshBuilder

export const SceneComponent = toComponent(Scene)
export type TScene = typeof Scene

export const EngineComponent = toComponent(Engine)
export type TEngine = typeof Engine