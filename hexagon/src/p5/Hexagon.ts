import { Entity, type Tp5 } from "./Entity";

export interface AbstractHexagon {
  x: number;
  y: number;
  color: string;
}

export default class Hexagon extends Entity {
  static radius = 30; // Radius of the small hexagons
  static height = Math.sqrt(3) * this.radius; // Height of a pointy-topped small hexagon
  static width = 2 * this.radius;
  hex: AbstractHexagon;
  constructor(p5: Tp5, data: AbstractHexagon) {
    super(p5);

    this.hex = { ...data };
  }
  render(): void {
    const p5 = this.p5;
    const { x, y, color } = this.hex;

    p5.push();
    p5.translate(x, y);
    p5.fill(color); // Use specified color to fill the hexagon
    p5.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = (p5.TWO_PI / 6) * i;
      const xOffset = Hexagon.radius * p5.cos(angle);
      const yOffset = Hexagon.radius * p5.sin(angle);
      p5.vertex(xOffset, yOffset);
    }
    p5.endShape(p5.CLOSE);
    p5.pop();
  }
}
