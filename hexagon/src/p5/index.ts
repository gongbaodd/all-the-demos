import type Tp5 from "p5";

const WIDTH = 1024;
const HEIGHT = 800;

const smallHexRadius = 30; // Radius of the small hexagons
const largeHexRadius = 300; // Radius of the large hexagon (overall size)
const hexHeight = Math.sqrt(3) * smallHexRadius; // Height of a pointy-topped small hexagon
const hexWidth = 2 * smallHexRadius; // Width of a pointy-topped small hexagon

let hexagons: { x: number; y: number; color: string }[] = []; // Array to store all small hexagons

export default function sketch(p5: Tp5) {
  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(12);
    p5.noLoop();

    drawHexagons();
  };

  p5.draw = () => {
    // Redraw hexagons with updated colors
    for (let hex of hexagons) {
      drawHexagon(hex.x, hex.y, smallHexRadius, hex.color);
    }
  };

  function drawHexagons() {
    p5.background(255);
    p5.stroke(0);
    p5.noFill();

    const centerX = WIDTH / 2;
    const centerY = HEIGHT / 2;

    // Fill the large hexagon with smaller hexagons
    let maxColumns = Math.ceil((2 * largeHexRadius) / (0.75 * hexWidth));
    let maxRows = Math.ceil((2 * largeHexRadius) / hexHeight);

    hexagons = []; // Clear hexagon array
    for (let row = -maxRows; row <= maxRows; row++) {
      for (let col = -maxColumns; col <= maxColumns; col++) {
        // Calculate the x and y position for each small hexagon
        let x = col * hexWidth * 0.75;
        let y = row * hexHeight;

        // Move odd columns down by half a hexagon's height
        if (p5.abs(col % 2) === 1) {
          y += hexHeight / 2;
        }

        // Position relative to the large hexagon's center
        x += centerX;
        y += centerY;

        // Check if the small hexagon is within the large hexagon boundary
        if (isPointInHexagon(centerX, centerY, largeHexRadius, x, y)) {
          // Store hexagon position and its state (default color)
          hexagons.push({ x, y, color: "white" });
          drawHexagon(x, y, smallHexRadius, "white"); // Draw with default color
        }
      }
    }
  }

  // Function to draw a hexagon at x, y with a specified color
  function drawHexagon(
    x: number,
    y: number,
    radius: number,
    fillColor: string
  ) {
    p5.push();
    p5.translate(x, y);
    p5.fill(fillColor); // Use specified color to fill the hexagon
    p5.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = (p5.TWO_PI / 6) * i;
      const xOffset = radius * p5.cos(angle);
      const yOffset = radius * p5.sin(angle);
      p5.vertex(xOffset, yOffset);
    }
    p5.endShape(p5.CLOSE);
    p5.pop();
  }

  // Check if a point (x, y) lies within a hexagon with a given center and radius
  function isPointInHexagon(
    centerX: number,
    centerY: number,
    radius: number,
    x: number,
    y: number
  ) {
    let dx = p5.abs(x - centerX);
    let dy = p5.abs(y - centerY);
    // Check if the point (x, y) is within the horizontal and vertical bounds of a hexagon
    if (dx > (radius * 3) / 2 || dy > (radius * Math.sqrt(3)) / 2) {
      return false;
    }
    // Further check the precise hexagon boundary
    return dx * Math.sqrt(3) + dy <= radius * Math.sqrt(3);
  }

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
