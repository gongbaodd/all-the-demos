import type Tp5 from "p5";
import { Entity } from "./Entity";

export default class GameMap extends Entity {
    constructor(p5: Tp5) {
        super(p5)
    }
    render() {
        
    }
    
    // Check if a point (x, y) lies within a hexagon with a given center and radius
    isInMap(
        centerX: number,
        centerY: number,
        radius: number,
        x: number,
        y: number
    ): boolean {
        const p5 = this.p5

        let dx = p5.abs(x - centerX);
        let dy = p5.abs(y - centerY);
        // Check if the point (x, y) is within the horizontal and vertical bounds of a hexagon
        if (dx > (radius * 3) / 2 || dy > (radius * Math.sqrt(3)) / 2) {
          return false;
        }
        // Further check the precise hexagon boundary
        return dx * Math.sqrt(3) + dy <= radius * Math.sqrt(3);
    }
}