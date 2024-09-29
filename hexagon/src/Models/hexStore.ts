import GameMap from "../p5/GameMap";
import type { AbstractHexagon } from "../p5/Hexagon";
import { TStep } from "./cardStore";
import playerStore from "./playerStore";

type TDirection = keyof typeof GameMap.directions;

type THex = AbstractHexagon & {
  color: string;
  isOccupied: boolean;
  isCurrent: boolean;
  isPeeked: boolean;
  owner: string | null;
  neighbors: Map<TDirection, AbstractHexagon>;
};

let hexes: THex[] = [];
let listeners: Function[] = [];

const hexStore = {
  noEffectAdd(hex: AbstractHexagon) {
    hexes = [
      ...hexes,
      {
        ...hex,
        color: "white",
        isOccupied: false,
        isCurrent: false,
        isPeeked: false,
        neighbors: new Map(),
        owner: null,
      },
    ];
  },

  noEffectSetNeighbors(
    x: number,
    y: number,
    direction: TDirection,
    hex: AbstractHexagon
  ) {
    const h = hexes.find((h) => h.x === x && h.y === y);
    if (h) {
      h.neighbors.set(direction, hex);
    }
  },

  findDistanceNeighbor(
    x: number,
    y: number,
    distance: number,
    direction: TDirection
  ): undefined | AbstractHexagon {
    const hex = hexes.find((h) => h.x === x && h.y === y);
    if (hex) {
      const nearestHex = hex.neighbors.get(direction);
      if (nearestHex) {
        if (distance - 1 > 0) {
          return hexStore.findDistanceNeighbor(
            nearestHex.x,
            nearestHex.y,
            distance - 1,
            direction
          );
        } else {
          return nearestHex;
        }
      }
    }
  },

  peek(p: TStep) {
    let changed = false;
    const hex = hexes.find((h) => h.isCurrent);
    const peeked: THex[] = [];

    console.log("peek", p);
    
    if (hex) {
      switch (p) {
        case TStep.move: {
          for (const { x, y } of hex.neighbors.values()) {
            const neighbor = hexes.find((h) => h.x === x && h.y === y);
            if (neighbor && !neighbor.isOccupied) {
              peeked.push(neighbor);
            }
          }
          break;
        }

        case TStep.jump:
        case TStep.jump2: {
          Object.keys(GameMap.directions).forEach((direction) => {
            const abstractNeighbor = hexStore.findDistanceNeighbor(
              hex.x,
              hex.y,
              p === TStep.jump ? 2 : 3,
              direction as TDirection
            );
            if (abstractNeighbor) {
              const neighbor = hexStore.getHex(
                abstractNeighbor.x,
                abstractNeighbor.y
              );
              if (neighbor && !neighbor.isOccupied) {
                peeked.push(neighbor);
              }
            }
          });

          break;
        }

        default:
          break;
      }
    }

    peeked.forEach((p) => {
      const color = playerStore.getColor();
      p.color = color.light;
      p.isPeeked = true;
      changed = true;
    });

    if (changed) {
      hexes = structuredClone(hexes);
      emitChange();
    }
  },

  getHex(x: number, y: number) {
    return hexes.find((h) => h.x === x && h.y === y);
  },

  occupyHex(x: number, y: number) {
    const hex = hexStore.getHex(x, y);
    if (hex) {
      const playerName = playerStore.getName();

      hex.isOccupied = true;

      const color = playerStore.getColor();
      hex.color = color.dark;
      hex.owner = playerName;

      const current = hexes.find((h) => h.isCurrent);
      if (current && current.owner === playerName) {
        current.isCurrent = false;
        current.color = color.medium;
      }
      hex.isCurrent = true;

      // clear peeks
      hexes.forEach((h) => {
        if (!h.isOccupied) h.color = "white";
        if (h.isPeeked) h.isPeeked = false;
      });

      hexes = structuredClone(hexes);
      emitChange();
    }
  },

  changeCurrent(x: number, y: number) {
    const current = hexes.find((h) => h.isCurrent);
    const hex = hexes.find((h) => h.x === x && h.y === y);
    if (current && hex) {
      current.isCurrent = false;
      hex.isCurrent = true;

      hexes = structuredClone(hexes);
      emitChange();
    }
  },

  getSnapshot() {
    return hexes;
  },

  subscribe(listener: Function) {
    listeners = [...listeners, listener];

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

export default hexStore;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}
