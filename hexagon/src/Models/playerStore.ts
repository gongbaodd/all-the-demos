import type { AbstractHexagon } from "../p5/Hexagon";
import cardStore from "./cardStore";
import hexStore from "./hexStore";

let listeners: Function[] = [];

const colors = {
  red: {
    dark: "#b71c1c",
    medium: "#e57373",
    light: " #ffcdd2",
  },
  blue: {
    dark: "#0d47a1",
    medium: "#64b5f6",
    light: "#bbdefb",
  },
};

type TCard = ReturnType<typeof cardStore.getCard>;

type TPlayer = {
  name: string;
  playing: boolean;
  color: typeof colors.red;
  cards: TCard[];
  position: AbstractHexagon | null;
  chosenCard: TCard | null;
  steps: Exclude<TCard, null>["steps"];
};

let players: TPlayer[] = [
  {
    name: "player 1",
    playing: true,
    color: colors.red,
    cards: Array.from([1, 2, 3]).map((_) => cardStore.getCard()),
    position: null,
    chosenCard: null,
    steps: [],
  },
  {
    name: "player 2",
    playing: false,
    color: colors.blue,
    cards: Array.from([1, 2, 3]).map((_) => cardStore.getCard()),
    position: null,
    chosenCard: null,
    steps: [],
  },
];

const playerStore = {
  togglePlayer() {
    players = structuredClone(players);

    const [playingOne] = players.filter(({ playing }) => playing);
    playingOne.playing = false;
    const nextOne = players[(players.indexOf(playingOne) + 1) % players.length];
    nextOne.playing = true;

    if (nextOne.position) {
      hexStore.changeCurrent(nextOne.position.x, nextOne.position.y);
    }

    emitChange();
  },

  takeStep() {
    const [playingOne] = players.filter(({ playing }) => playing);
    const card = playingOne.chosenCard;
    if (!card || card.steps.length === 0) {
      // choose position
      playerStore.togglePlayer();
      return;
    }

    const { steps } = card;
    const step = steps.shift()!;

    playingOne.steps.push(step);

    if (steps.length === 0) {
      card.steps = [...playingOne.steps];
      playingOne.steps = [];
      playingOne.chosenCard = null;

      const index = playingOne.cards.indexOf(card);
      playingOne.cards.splice(index, 1);

      playingOne.cards.push(cardStore.getCard());
      cardStore.putBack(card);

      playerStore.togglePlayer();
    } else {
      hexStore.peek(step);
    }
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

  getName() {
    const [player] = players.filter(({ playing }) => playing);
    return player.name;
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
