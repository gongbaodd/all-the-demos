/**
 * @param {any} base
 * @param {(draft: any) => any} recipe
 * @returns {any}
 */
function produce(base, recipe) {
  // your code here
  const copy = JSON.parse(JSON.stringify(base));
  recipe(copy);
  if (equals(base, copy)) {
    return base;
  }
  return copy;

  function equals(base, copy) {
    if (typeof base !== typeof copy) {
      return false;
    }
    if (typeof base !== "object") {
      return base === copy;
    }
    let isEqual = true;

    for (const key in copy) {
      if (key in copy) {
        if (equals(base[key], copy[key])) {
          copy[key] = base[key];
        } else {
          isEqual = false;
        }
      } else {
        isEqual = false;
      }
    }

    for (const key in base) {
      if (key in base && !(key in copy)) {
        isEqual = false;
      }
    }

    return isEqual;
  }
}

const state = {
  a: {
    b: {
      c: "BFE",
    },
    d: {
      e: ".",
    },
  },
  g: {
    h: "dev",
  },
};
const newState = produce(state, (draft) => {
  draft.a.b.c = "bigfrontend";
  const g = draft.g;
  const d = draft.a.d;
});

console.log(newState); // false
console.log(state === newState); // false
console.log(state.a === newState.a); // false
console.log(state.a.b === newState.a.b); // false
console.log(state.a.d === newState.a.d); // true
console.log(state.g === newState.g); // true
