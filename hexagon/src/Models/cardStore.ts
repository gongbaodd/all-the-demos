let listeners: Function[] = [];

const cardData = [
  {
    name: "move 1 step",
    num: 9,
  },
  {
    name: "move 2 steps",
    num: 9,
  },
  {
    name: "move 3 steps",
    num: 9,
  },
  {
    name: "move 4 steps",
    num: 9,
  },
  {
    name: "move 1 step and jump move",
    num: 2,
  },
  {
    name: "move 1 step and jump 2 blocks",
    num: 1,
  },
  {
    name: "jump 1 block and move 1 step",
    num: 4,
  },
  {
    name: "move 1 step and jump 1 block",
    num: 4,
  },
  {
    name: "jump 2 blocks and move 1 step",
    num: 1,
  },
  {
    name: "jump 2 blocks",
    num: 2,
  },
];

let cards = cardData.reduce((prev, card) => {
  const sum = [...prev];

  for (let i = 0; i < card.num; i++) {
    sum.push(structuredClone(card));
  }

  return sum;
}, [] as typeof cardData);

const cardStore = {
  getCard() {
    if (cards.length === 0) {
      return null; // No cards left to pick.
    }

    // Generate a random index.
    const randomIndex = Math.floor(Math.random() * cards.length);

    // Remove and return the card at the random index.
    const pickedCard = cards.splice(randomIndex, 1)[0];
    cards = structuredClone(cards);

    // Notify all listeners that the card store has changed.
    emitChange();

    return pickedCard;
  },
  putBack(card: typeof cardData[0]) {
    cards.push(card);
    cards = structuredClone(cards);

    emitChange();
  },
  subscribe(listener: Function) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return cards;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export default cardStore;
