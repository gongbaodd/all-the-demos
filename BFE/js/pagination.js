// fetchList is provided for you
// const fetchList = (since?: number) =>
//   Promise<{items: Array<{id: number}>}>

// you can change this to generator function if you want
const fetchListWithAmount = async (amount = 5) => {
  // your code here

  let result = [];
  let lastItemId;

  while (result.length < amount) {
    const { items } = await fetchList(lastItemId);

    if (items.length > 0) {
      lastItemId = items[items.length - 1].id;
      result = result.concat(items);
    } else {
      break;
    }
  }

  return result.slice(0, amount);
};
