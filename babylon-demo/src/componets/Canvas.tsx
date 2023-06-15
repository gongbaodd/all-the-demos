import React, { FC, HTMLAttributes, ReactNode, createContext, useCallback, useEffect } from "react";

interface ICanvas extends FC<{children: ReactNode} & HTMLAttributes<HTMLCanvasElement>> {
    Context?: React.Context<HTMLCanvasElement>
}

export const Canvas: ICanvas = function({children, ...props}) {
    const [canvasEl, setCanvasEl] = React.useState<HTMLCanvasElement | null>(null)
    const canvasRef = useCallback((el: HTMLCanvasElement) => {
        setCanvasEl(el)
        Canvas.Context = createContext(el);
    }, [])

    return <canvas ref={canvasRef} {...props}>{Canvas.Context && children}</canvas>
}