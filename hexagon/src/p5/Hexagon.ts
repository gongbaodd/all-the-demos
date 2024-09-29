import hexStore from "../Models/hexStore";
import playerStore from "../Models/playerStore";
import { Entity, type Tp5 } from "./Entity";
import Scene from "./Scene";

export interface AbstractHexagon {
  x: number;
  y: number;
  col: number;
  row: number;
}

export default class Hexagon extends Entity {
  static radius = 30; // Radius of the small hexagons
  static height = Math.sqrt(3) * this.radius; // Height of a pointy-topped small hexagon
  static width = 2 * this.radius;
  hex: AbstractHexagon;
  constructor(p5: Tp5, data: AbstractHexagon) {
    super(p5);

    this.hex = { ...data };

    // TODO: remove event when entity removed
    Scene.mousePressEvents.push(this.mousePressed);
    // TODO: rmove listener
    const _removeListener = hexStore.subscribe(() => {
      p5.redraw();
    });

    hexStore.noEffectAdd(this.hex);
  }

  mousePressed = () => {
    const { mouseX, mouseY } = this.p5;
    const players = playerStore.getSnapshot();
    const [currPlayer] = players.filter((p) => p.playing);

    if (currPlayer.position && !currPlayer.chosenCard) {
      return false;
    }

    const { x, y } = this.hex;

    if (
      this.p5.dist(mouseX, mouseY, x, y) < Hexagon.radius &&
      hexStore.getHex(x, y)?.isOccupied === false
    ) {
      hexStore.occupyHex(x, y);
      playerStore.updatePos(this.hex);
      playerStore.takeStep();

      return true;
    }

    return false;
  };

  render(): void {
    const p5 = this.p5;
    const { x, y } = this.hex;
    const color = hexStore.getHex(x, y)?.color || "white";

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
