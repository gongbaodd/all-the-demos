import type GameMap from "../p5/GameMap";
import type Hexagon from "../p5/Hexagon";
import type { AbstractHexagon } from "../p5/Hexagon";
import playerStore from "./playerStore";

type TDirection = keyof typeof GameMap.directions;

type THex = AbstractHexagon & {
  color: string;
  isOccupied: boolean;
  isCurrent: boolean;
  owner: string | null;
  neighbors: Map<TDirection, AbstractHexagon>;
};

let hexes: THex[] = [];
let listeners: Function[] = [];

export enum TPeek {
  move,
  jump,
}

const hexStore = {
  noEffectAdd(hex: AbstractHexagon) {
    hexes = [
      ...hexes,
      {
        ...hex,
        color: "white",
        isOccupied: false,
        isCurrent: false,
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

  peek(p: TPeek) {
    if (p === TPeek.move) {
      
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
      hex.color = color.medium;
      hex.owner = playerName;

      const current = hexes.find((h) => h.isCurrent);
      if (current && current.owner === playerName ) {
        current.isCurrent = false;
        current.color = color.dark;
      }
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
