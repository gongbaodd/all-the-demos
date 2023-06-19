import { FC, ReactNode } from "react"
import { SceneComponent } from "../componets/Babylon"
import { debugLayer } from "../utils/debugLayer"

interface Props {
    children?: ReactNode
}

export const Loading: FC<Props> = ({children}) => {
    return (
        <SceneComponent>
            {!!children && debugLayer(children)}
        </SceneComponent>
    )
}

