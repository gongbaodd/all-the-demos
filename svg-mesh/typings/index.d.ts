declare module 'svg-mesh-3d' {
    export default function (svg: string, opt?: any): {
        cells: number[],
        positions: number[],
    };
}