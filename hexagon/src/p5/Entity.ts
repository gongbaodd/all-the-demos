import type Tp5 from "p5";

export class Entity {
  p5: Tp5;
  children: Entity[] = [];
  constructor(p5: Tp5) {
    this.p5 = p5;
  }
  add(child: Entity) {
    this.children.push(child);
  }
  render() {}
}
