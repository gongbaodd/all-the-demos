import type Tp5 from "p5";
import type { Entity } from "./Entity";

const WIDTH = 1024;
const HEIGHT = 800;

export default class Scene {
  #p5: Tp5;
  children: Entity[] = [];
  constructor(p5: Tp5) {
    this.#p5 = p5;
  }

  add(child: Entity) {
    this.children.push(child);
  }

  init() {
    this.#p5.setup = () => {
      this.#p5.createCanvas(WIDTH, HEIGHT);
      this.#p5.textAlign(this.#p5.CENTER, this.#p5.CENTER);
      this.#p5.textSize(12);
      this.#p5.noLoop();

      this.#p5.stroke(0);
      this.#p5.noFill();
    };
  }

  render() {
    this.#p5.draw = () => {
      this.children.forEach((child) => {
        child.render();
      });
    };
  }
}
