let listeners: Function[] = [];

const cards = [
  "jump",
  "jump 2 blocks",
  "jump 3 blocks",
  "move",
  "move x 2",
  "move x 3",
  "move x 4",
  "move jump move",
  "move, jump x 2",
  "jump move",
  "move jump",
  "jump x 2, move"
]

let players = [
  {
    name: "player 1",
    playing: true,
    color: "red",
    card1: cards[Math.random()]
  },
  {
    name: "player 2",
    playing: false,
    color: "blue",
  },
];

const playerStore = {
  togglePlayer() {
    players = [...players];

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
