import playerStore from "../Models/playerStore";
import { Entity, type Tp5 } from "./Entity";
import GameMap from "./GameMap";
import Scene from "./Scene";

export interface AbstractHexagon {
  x: number;
  y: number;
  col: number;
  row: number;
  color: string;
}

export default class Hexagon extends Entity {
  static radius = 15; // Radius of the small hexagons
  static height = Math.sqrt(3) * this.radius; // Height of a pointy-topped small hexagon
  static width = 2 * this.radius;
  hex: AbstractHexagon;
  neighbors: Map<keyof typeof GameMap.directions, Hexagon> = new Map();
  constructor(p5: Tp5, data: AbstractHexagon) {
    super(p5);

    this.hex = { ...data };

    // TODO: remove event when entity removed
    Scene.mousePressEvents.push(this.mousePressed);
  }

  mousePressed = () => {
    const { mouseX, mouseY } = this.p5;
    if (
      this.p5.dist(mouseX, mouseY, this.hex.x, this.hex.y) < Hexagon.radius &&
      this.hex.color === "white"
    ) {
      this.hex.color = playerStore.getColor();
      return true;
    }

    return false;
  };

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
