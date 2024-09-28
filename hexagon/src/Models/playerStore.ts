import type { AbstractHexagon } from "../p5/Hexagon";
import cardStore from "./cardStore";

let listeners: Function[] = [];

const colors = {
  red: {
    dark: "#b71c1c",
    medium: "#d32f2f",
    light: " #e57373",
  },
  blue: {
    dark: "#0d47a1",
    medium: "#1976d2",
    light: "#64b5f6",
  },
};

type TCard = ReturnType<typeof cardStore.getCard>;

type TPlayer = {
  name: string;
  playing: boolean;
  color: string;
  cards: TCard[];
  position: AbstractHexagon | null;
  chosenCard: TCard | null;
};

let players: TPlayer[] = [
  {
    name: "player 1",
    playing: true,
    color: colors.red.medium,
    cards: Array.from([1, 2, 3]).map((_) => cardStore.getCard()),
    position: null,
    chosenCard: null,
  },
  {
    name: "player 2",
    playing: false,
    color: colors.blue.medium,
    cards: Array.from([1, 2, 3]).map((_) => cardStore.getCard()),
    position: null,
    chosenCard: null
  },
];

const playerStore = {
  togglePlayer() {
    players = structuredClone(players);

    const [playingOne] = players.filter(({ playing }) => playing);
    playingOne.playing = false;
    const nextOne = players[(players.indexOf(playingOne) + 1) % players.length];
    nextOne.playing = true;

    emitChange();
  },
  updatePos(hexagon: AbstractHexagon) {
    const [playingOne] = players.filter(({ playing }) => playing);
    playingOne.position = hexagon;

    players = structuredClone(players);

    emitChange();
  },

  chooseCard(card: TCard) {
    const [playingOne] = players.filter(({ playing }) => playing);
    playingOne.chosenCard = card;

    players = structuredClone(players);

    emitChange();
  },
  getColor() {
    const [player] = players.filter(({ playing }) => playing);
    return player.color;
  },
  subscribe(listener: Function) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return players;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export default playerStore;
