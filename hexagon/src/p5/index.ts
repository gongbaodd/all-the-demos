import GameMap from "./GameMap";
import Scene from "./Scene";
import type { Sketch } from "@p5-wrapper/react";

const sketch: Sketch = (p5) => {
  const scene = new Scene(p5);
  const map = new GameMap(p5, Scene.width / 2, Scene.height / 2);

  scene.add(map);
  scene.init();

  map.fill();
  map.findNeighbors();

  scene.render();
};

export default sketch;
