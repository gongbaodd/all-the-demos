import type Tp5 from "p5";
import type { Entity } from "./Entity";
import playerStore from "../Models/playerStore";

export default class Scene {
  static width = 1024;
  static height = 800;

  // return true to stop events
  static mousePressEvents: (() => boolean)[] = [];

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
      this.#p5.createCanvas(Scene.width, Scene.height);
      this.#p5.textAlign(this.#p5.CENTER, this.#p5.CENTER);
      this.#p5.textSize(12);
      this.#p5.noLoop();

      this.#p5.stroke(0);
      this.#p5.noFill();
    };

    this.#p5.mousePressed = () => {
      for (const evtFunc of Scene.mousePressEvents) {
        if (evtFunc()) {
          playerStore.togglePlayer();
          break;
        }
      }

      this.#p5.redraw();
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
