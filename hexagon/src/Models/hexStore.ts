import type { AbstractHexagon } from "../p5/Hexagon";

let hexes: AbstractHexagon[] = [];
let listeners: Function[] = [];

const hexStore = {
  add(hex: AbstractHexagon) {
    hexes = [...hexes, hex];

    emitChange();
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
