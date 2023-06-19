import { useCallback, useMemo, useState } from "react"
import { SceneComponent } from "../componets/Babylon"
import { DebugLayer } from "../utils/DebugLayer"
import { Color3, MeshBuilder, Nullable, PointLight, ShadowGenerator, TransformNode, Vector3 } from "@babylonjs/core"
import { useScene } from "react-babylonjs"
import { Player } from "../componets/Player"

export const Game = () => {
    return (
        <SceneComponent>
            <DebugLayer>
                <Environment />
            </DebugLayer>
        </SceneComponent>
    )
}

const Environment = () => {
    const scene = useScene()
    const ground = useMemo(() => {
        const ground = MeshBuilder.CreateBox("ground", { size: 24 }, scene)
        ground.scaling = new Vector3(1, .02, 1)
        return ground
    }, [])
    const envLightDirection = useMemo(() => new Vector3(0, 1, 0), [])
    const sparkLightPos = useMemo(() => new Vector3(0, 1, 0), [])
    const sparkLightDiffuse = useMemo(() => new Color3(0.08627450980392157, 0.10980392156862745, 0.15294117647058825), [])
    const [_, setShadow] = useState<Nullable<ShadowGenerator>>(null)
    const camPos = useMemo(() => new Vector3(0, 0, -30), [])
    const root = useMemo(() => {
        const root = new TransformNode("root")
        root.position = new Vector3(0, 0, 0)
        root.rotation = new Vector3(0, Math.PI, 0)
        return root
    }, [])
    const yTilt = useMemo(() => {
        const yTilt = new TransformNode("yTilt")
        // yTilt.rotation = Player.ORIGINAL_TILT
        return yTilt
    }, [])

    const sparkLightRef = useCallback((light: PointLight) => {
        const shadow = new ShadowGenerator(1024, light)
        shadow.darkness = .4
        setShadow(shadow)
    }, [])

    return (
        <>
            {/* ground */}
            <hemisphericLight name="envLight" direction={envLightDirection} />
            <pointLight name="sparkLight" position={sparkLightPos} diffuse={sparkLightDiffuse} intensity={35} radius={1} ref={sparkLightRef} />
            <universalCamera name="playerCam" position={camPos} fov={.5} lockedTarget={root.position} />
            <Player />
        </>
    )
}

