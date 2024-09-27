import type Tp5 from "p5";
import { Entity } from "./Entity";
import Hexagon from "./Hexagon";

export default class GameMap extends Entity {
  children: Entity[] = [];
  hexes: Hexagon[] = [];
  x: number;
  y: number;
  static readonly radius = 300; // Radius of the large hexagon (overall size)
  static readonly height = Math.sqrt(3) * this.radius;
  static readonly width = 2 * this.radius;
  static readonly maxColumns = Math.ceil(
    (2 * GameMap.radius) / (0.75 * Hexagon.width)
  );
  static readonly maxRows = Math.ceil((2 * GameMap.radius) / Hexagon.height);
  static readonly directions = {
    top: { dc: 0, dr: -1 },
    topRight: { dc: 1, dr: -1 },
    bottomRight: { dc: 1, dr: 0 },
    bottom: { dc: 0, dr: 1 },
    bottomLeft: { dc: -1, dr: 0 },
    topLeft: { dc: -1, dr: -1 },
  };

  constructor(p5: Tp5, x: number, y: number) {
    super(p5);

    this.x = x;
    this.y = y;

    this.fill();
    this.findNeighbors(); // After filling, find and store neighbors for each hexagon
  }

  fill() {
    const maxColumns = GameMap.maxColumns;
    const maxRows = GameMap.maxRows;
    const hexWidth = Hexagon.width;
    const hexHeight = Hexagon.height;
    const centerX = this.x;
    const centerY = this.y;
    const largeHexRadius = GameMap.radius;

    for (let row = -maxRows; row <= maxRows; row++) {
      for (let col = -maxColumns; col <= maxColumns; col++) {
        // Calculate the x and y position for each small hexagon
        let x = col * hexWidth * 0.75;
        let y = row * hexHeight;

        // Move odd columns down by half a hexagon's height
        if (this.p5.abs(col % 2) === 1) {
          y += hexHeight / 2;
        }

        // Position relative to the large hexagon's center
        x += centerX;
        y += centerY;

        // Check if the small hexagon is within the large hexagon boundary
        if (this.isInMap(centerX, centerY, largeHexRadius, x, y)) {
          // Store hexagon position and its state (default color)
          const hex = new Hexagon(this.p5, { x, y, color: "white", col, row });
          this.hexes.push(hex);
          this.add(hex);
        }
      }
    }
  }

  // Check if a point (x, y) lies within a hexagon with a given center and radius
  isInMap(
    centerX: number,
    centerY: number,
    radius: number,
    x: number,
    y: number
  ): boolean {
    const p5 = this.p5;

    let dx = p5.abs(x - centerX);
    let dy = p5.abs(y - centerY);
    // Check if the point (x, y) is within the horizontal and vertical bounds of a hexagon
    if (dx > (radius * 3) / 2 || dy > (radius * Math.sqrt(3)) / 2) {
      return false;
    }
    // Further check the precise hexagon boundary
    return dx * Math.sqrt(3) + dy <= radius * Math.sqrt(3);
  }

  // Function to find neighbors for each hexagon
  findNeighbors() {
    const directions = GameMap.directions;

    this.hexes.forEach((hexagon) => {
      hexagon.neighbors = new Map(); // Initialize the neighbors map

      const { hex } = hexagon;

      for (const [direction, offset] of Object.entries(directions)) {
        let neighborCol = hex.col + offset.dc;
        let neighborRow = hex.row + offset.dr;

        // Adjust for odd/even columns (hex grid row offset for odd columns)
        if (this.p5.abs(hex.col % 2) === 1 && offset.dc !== 0) {
          neighborRow += 1;
        }

        // Find the matching hexagon in the grid
        const neighbor = this.hexes.find(
          (h) => h.hex.col === neighborCol && h.hex.row === neighborRow
        );

        if (neighbor) {
          const _direction = direction as keyof typeof GameMap.directions;
          hexagon.neighbors.set(_direction, neighbor); // Store the neighbor with its direction
        }
      }
    });
  }
}
