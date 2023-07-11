import { BaseTexture, Color3, Scene, Vector3 } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";
import { BabylonNode, FiberMaterialProps, FiberMaterialPropsHandler, FiberPushMaterialProps, FiberPushMaterialPropsHandler, HasPropsHandlers, HostRegistrationStore, PropertyUpdate, PropsHandler, checkColor3Diff, checkPrimitiveDiff, checkTextureDiff, checkVector3Diff } from "react-babylonjs";

interface GridProps {
    mainColor?: Color3,
    lineColor?: Color3,
    gridRatio?: number,
    gridOffset?: Vector3,
    minorUnitVisibility?: number,
    opacity?: number,
    preMultiplyAlpha?: boolean,
    majorUnitFrequency?: BaseTexture
}

class GridMaterialPropsHandler implements PropsHandler<GridProps> {
    getPropertyUpdates(oldProps: GridProps, newProps: GridProps) {
        const changedProps: PropertyUpdate[] = []
        checkColor3Diff(oldProps.mainColor, newProps.mainColor, 'mainColor', changedProps)
        checkColor3Diff(oldProps.lineColor, newProps.lineColor, 'lineColor', changedProps)
        checkPrimitiveDiff(oldProps.gridRatio, newProps.gridRatio, 'gridRatio', changedProps)
        checkVector3Diff(oldProps.gridOffset, newProps.gridOffset, 'gridOffset', false, changedProps)
        checkPrimitiveDiff(oldProps.minorUnitVisibility, newProps.minorUnitVisibility, 'minorUnitVisibility', changedProps)
        checkPrimitiveDiff(oldProps.opacity, newProps.opacity, 'opacity', changedProps)
        checkPrimitiveDiff(oldProps.preMultiplyAlpha, newProps.preMultiplyAlpha, 'preMultiplyAlpha', changedProps)
        checkTextureDiff(oldProps.majorUnitFrequency, newProps.majorUnitFrequency, 'majorUnitFrequency', changedProps)
        return changedProps.length == 0 ? null : changedProps
    }
}

type GridMaterialProps = GridProps & FiberPushMaterialProps & FiberMaterialProps

class FiberGridMaterial implements HasPropsHandlers<GridMaterialProps> {
    private propsHandlers: PropsHandler<GridMaterialProps>[]

    constructor() {
        this.propsHandlers = [
            new GridMaterialPropsHandler(),
            new FiberPushMaterialPropsHandler(),
            new FiberMaterialPropsHandler()
        ]
    }

    getPropsHandlers() {
        return this.propsHandlers
    }

    addPropsHandler(propHandler: PropsHandler<GridMaterialProps>): void {
        this.propsHandlers.push(propHandler)
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            myCustomMaterial: GridMaterialProps & BabylonNode<GridMaterial>
        }
    }
}

HostRegistrationStore.Register({
    hostElementName: "myCustomMaterial",
    hostFactory: (scene: Scene, props: GridMaterialProps) => {
        const name = props.name??'unknown'
        const material = new GridMaterial(name, scene)
        return material
    },
    propHandlerInstance: new FiberGridMaterial(),
    createInfo: {
        creationType: "new GridMaterial",
        libraryLocation: "GridMaterial",
        namespace: "@babylonjs/materials",
        parameters: [
            { name: "name", type: "string", optional: false },
            { name: "scene", type: "Scene", optional: false }
        ]
    },
    metadata: {
        isMaterial: true,
        className: 'GridMaterial'
    }
})