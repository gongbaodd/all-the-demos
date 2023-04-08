expect(
  layout(3, 3, [
    {
      id: 1,
    },
  ])
).toEqual([
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]);

expect(
  layout(3, 3, [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
  ])
).toEqual([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

expect(
  layout(3, 3, [
    {
      id: 1,
      style: {
        gridColumnStart: "span 2",
      },
    },
    {
      id: 2,
      style: {
        gridColumnStart: "span 2",
      },
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ])
).toEqual([
  [1, 1, 0],
  [2, 2, 3],
  [4, 5, 0],
]);

expect(
  layout(3, 3, [
    {
      id: 1,
      style: {
        gridColumnStart: "span 2",
        gridRowStart: 2,
      },
    },
    {
      id: 2,
      style: {
        gridColumnStart: 2,
        gridColumnEnd: "span 2",
      },
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ])
).toEqual([
  [0, 2, 2],
  [1, 1, 3],
  [4, 5, 0],
]);

expect(
  layout(3, 3, [
    {
      id: 1,
      style: {
        gridColumnStart: "span 2",
      },
    },
    {
      id: 2,
      style: {
        gridColumnEnd: "span 2",
      },
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ])
).toEqual([
  [1, 1, 0],
  [2, 2, 3],
  [4, 5, 0],
]);

expect(
  layout(3, 3, [
    {
      id: 1,
      style: {
        gridColumnStart: "span 2",
        gridColumnEnd: 4,
      },
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
      style: {
        gridColumnStart: "span 2",
        gridColumnEnd: 4,
      },
    },
  ])
).toEqual([
  [0, 1, 1],
  [2, 3, 4],
  [0, 5, 5],
]);

expect(
  layout(3, 3, [
    {
      id: 1,
      style: {
        gridRowStart: 2,
      },
    },
    {
      id: 2,
      style: {
        gridColumnStart: "span 2",
        gridRowEnd: "span 2",
      },
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ])
).toEqual([
  [0, 2, 2],
  [1, 2, 2],
  [3, 4, 5],
]);

expect(
  layout(3, 3, [
    {
      id: 1,
      style: {
        gridRowEnd: "span 2",
      },
    },
    {
      id: 2,
      style: {
        gridRowStart: 2,
      },
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ])
).toEqual([
  [0, 1, 3],
  [2, 1, 4],
  [5, 0, 0],
]);

expect(
  layout(4, 4, [
    {
      id: 1,
      style: {
        gridRowEnd: "span 2",
      },
    },
    {
      id: 2,
      style: {
        gridRowStart: 2,
      },
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
      style: {
        gridRowStart: "span 2",
      },
    },
    {
      id: 6,
    },
    {
      id: 7,
      style: {
        gridColumnStart: "span 3",
      },
    },
    {
      id: 8,
    },
  ])
).toEqual([
  [0, 1, 3, 4],
  [2, 1, 5, 6],
  [0, 0, 5, 0],
  [7, 7, 7, 8],
]);
expect(
  layout(4, 4, [
    {
      id: 1,
      style: {
        gridRowStart: 1,
        gridRowEnd: 3,
        gridColumnStart: 2,
        gridColumnEnd: 3,
      },
    },
    {
      id: 2,
      style: {
        gridRowStart: 2,
        gridColumnStart: 4,
      },
    },
    {
      id: 3,
      style: {
        gridColumnStart: "span 2",
      },
    },
    {
      id: 4,
      style: {
        gridColumnStart: "span 2",
      },
    },
    {
      id: 5,
      style: {
        gridRowStart: "span 2",
      },
    },
    {
      id: 6,
    },
    {
      id: 7,
      style: {
        gridRowStart: 4,
        gridColumnStart: 1,
      },
    },
    {
      id: 8,
    },
  ])
).toEqual([
  [0, 1, 3, 3],
  [0, 1, 0, 2],
  [4, 4, 5, 6],
  [7, 8, 5, 0],
]);

expect(
  layout(3, 3, [
    {
      id: 1,
      style: {
        gridColumnStart: 2,
      },
    },
    {
      id: 2,
      style: {
        gridColumnStart: 1,
      },
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ])
).toEqual([
  [0, 1, 0],
  [2, 3, 4],
  [5, 0, 0],
]);

expect(
  layout(3, 3, [
    {
      id: 1,
      style: {
        gridColumnStart: 2,
      },
    },
    {
      id: 2,
      style: {
        gridColumnStart: 2,
      },
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ])
).toEqual([
  [0, 1, 0],
  [0, 2, 3],
  [4, 5, 0],
]);
expect(
  layout(3, 3, [
    {
      id: 1,
      style: {
        gridColumnStart: 2,
      },
    },
    {
      id: 2,
      style: {
        gridColumnStart: 3,
      },
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ])
).toEqual([
  [0, 1, 2],
  [3, 4, 5],
  [0, 0, 0],
]);

expect(
  layout(2, 5, [
    {
      id: 1,
      style: {
        gridRowStart: 1,
        gridColumnStart: 2,
      },
    },
    {
      id: 2,
      style: {
        gridColumnStart: "span 2",
        gridRowStart: 1,
      },
    },
    {
      id: 3,
      style: {
        gridRowStart: 1,
      },
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ])
).toEqual([
  [4, 1, 2, 2, 3],
  [5, 0, 0, 0, 0],
]);
