import GameMap from "./GameMap";
import Scene from "./Scene";
import type { Sketch } from "@p5-wrapper/react";

const WIDTH = 1024;
const HEIGHT = 800;

const centerX = WIDTH / 2;
const centerY = HEIGHT / 2;

const smallHexRadius = 30; // Radius of the small hexagons

let hexagons: { x: number; y: number; color: string }[] = []; // Array to store all small hexagons

const sketch: Sketch = p5 => {
  const scene = new Scene(p5);
  const map = new GameMap(p5, centerX, centerY);

  scene.add(map);

  scene.init();
  scene.render()
  
  // Detect mouse click and change color of clicked hexagon
  p5.mousePressed = () => {
    let closestHexIndex = -1;
    let closestDistance = Infinity;

    // Check which hexagon was clicked and mark it red
    for (let i = 0; i < hexagons.length; i++) {
      let hex = hexagons[i];
      if (
        p5.dist(p5.mouseX, p5.mouseY, hex.x, hex.y) < smallHexRadius &&
        hex.color === "white"
      ) {
        // Change the clicked hexagon's color to red
        hex.color = "red";

        // Find the nearest hexagon that is still white
        for (let j = 0; j < hexagons.length; j++) {
          let candidateHex = hexagons[j];
          if (candidateHex.color === "white") {
            let distance = p5.dist(
              hex.x,
              hex.y,
              candidateHex.x,
              candidateHex.y
            );
            if (distance < closestDistance) {
              closestDistance = distance;
              closestHexIndex = j;
            }
          }
        }

        // Mark the nearest white hexagon blue
        if (closestHexIndex !== -1) {
          hexagons[closestHexIndex].color = "blue";
        }

        p5.redraw(); // Redraw the canvas
        break;
      }
    }
  };
}

export default sketch;