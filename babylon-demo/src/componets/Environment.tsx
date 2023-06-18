import React, { FC, useCallback, useContext, useMemo, useState } from "react"
import { HemisphericLightComponent, MeshComponent, PointLightComponent, SceneComponent, THemisphericLight, TMesh, TMeshBuilder, TPointLight, TSceneInstance } from "./Babylon"
import { Color3, ShadowGenerator, Vector3 } from "@babylonjs/core"

interface Props {
    children?: (shadow: ShadowGenerator) => React.ReactNode
}

export const Environment: FC<Props> = ({ children }) => {
    const scene = useContext(SceneComponent.Context!)
    const [light, setLight] = useState<InstanceType<TPointLight>|null>(null)
    const shadow = useMemo(() => {
        if (light) {
            const shadow = new ShadowGenerator(1024, light)
            shadow.darkness = .4
            return shadow
        }
    }, [light])


    const initGound = useCallback((_: TMesh, scene: TSceneInstance, Builder?: TMeshBuilder) => { 
        const ground = Builder!.CreateBox("ground", { size: 24 }, scene); 
        ground.scaling = new Vector3(1, .02, 1)
        return ground
    }, [])
    const initEnvLight = useCallback((Light: THemisphericLight, scene: TSceneInstance) => {
        const light = new Light("EnvLight", new Vector3(0, 1, 0), scene)
        return light
    }, [])
    const initSparkLight = useCallback((Light: TPointLight, scene: TSceneInstance) => {
        const light = new Light("SparkLight", new Vector3(0, 1, 0), scene)
        light.diffuse = new Color3(0.08627450980392157, 0.10980392156862745, 0.15294117647058825)
        light.intensity = 35
        light.radius = 1
        setLight(light)
        return light
    }, [])

    return (
        <>
            <MeshComponent scene={scene} initNode={initGound} />
            <HemisphericLightComponent scene={scene} initNode={initEnvLight} />
            <PointLightComponent scene={scene} initNode={initSparkLight} />
            {!!children && !!shadow && children(shadow)}
        </>
        )
}