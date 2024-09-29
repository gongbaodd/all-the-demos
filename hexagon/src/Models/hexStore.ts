import type GameMap from "../p5/GameMap";
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

  peek(p: TStep) {
    if (p === TStep.move) {
      const hex = hexes.find((h) => h.isCurrent);
      let changed = false;

      if (hex) {
        for (const { x, y } of hex.neighbors.values()) {
          const neighbor = hexes.find((h) => h.x === x && h.y === y);
          if (neighbor && !neighbor.isOccupied) {
            const color = playerStore.getColor();
            neighbor.color = color.light;
            neighbor.isPeeked = true;
            changed = true;
          }
        }
      }

      if (changed) {
        hexes = structuredClone(hexes);
        emitChange();
      }
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
      })

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
