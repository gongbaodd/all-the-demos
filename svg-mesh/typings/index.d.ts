/// <reference types="vite/client" />

declare module 'svg-mesh-3d' {
    export default function (svg: string, opt?: any): {
        cells: number[][],
        positions: number[][],
    };
}

declare module "triangle-centroid" {
    export default function (tri: number[][]): number[];
}