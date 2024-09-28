import cardStore from "./cardStore";

let listeners: Function[] = [];

let players = [
  {
    name: "player 1",
    playing: true,
    color: "red",
    cards: Array.from([1, 2, 3]).map((_) => cardStore.getCard()),
  },
  {
    name: "player 2",
    playing: false,
    color: "blue",
    cards: Array.from([1, 2, 3]).map((_) => cardStore.getCard()),
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
