import { ChangeEvent, useCallback, useState } from "react";
import { Engine, Scene } from "react-babylonjs";
import { useMem } from "../../hooks/src/useMem";
import { Vector3 } from "@babylonjs/core";

const RED = 'Red';
const GREEN = 'Green';
const BLUE = 'Blue';
type TColors = typeof RED | typeof GREEN | typeof BLUE;
const COLORS: TColors[] = [RED, GREEN, BLUE];

export function App() {
    const mem = useMem()

    const [selectedColor, setSelectedColor] = useState<TColors>(GREEN);
    const onColorChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedColor(e.target.value as TColors)
    }, [])

    return (
        <div className="App">
            <div className="row">
                <label htmlFor="color-select">
                    Choose Color:
                </label>
                <select
                    id="color-select"
                    defaultValue={selectedColor}
                    onChange={onColorChange}
                >
                    {COLORS.map((color) => (
                        <option
                            key={color}
                            value={color}
                        >
                            {color}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row">
                <Engine
                    antialias
                    adaptToDeviceRatio
                    canvasId="sample-canvas"
                >
                    <Scene>
                        <arcRotateCamera
                            name="arc"
                            target={mem(Vector3.Zero())}
                            minZ={0.001}
                            alpha={-Math.PI / 4}
                            beta={Math.PI / 4}
                            radius={5}
                            upperBetaLimit={Math.PI / 2 * .99}
                        />
                        <hemisphericLight
                            name="light1"
                            intensity={.7}
                            direction={mem(Vector3.Up())}
                        />
                        <sphere
                            name="sphere1"
                            diameter={2}
                            segments={16}
                            position={mem(new Vector3(0, 1, 0))}
                        >

                        </sphere>
                        <ground
                            name="ground1"
                            width={6}
                            height={6}
                            subdivisions={2}
                        />
                    </Scene>
                </Engine>
            </div>
        </div>
    )
}