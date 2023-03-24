// type Interval = [number, number]

/**
 * @param {Interval[][]} schedules
 * @return {Interval[]}
 */
function findMeetingSlots(schedules) {
  // your code here
  const result = [];
  const clock = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, -1,
  ];

  for (let i = 0; i < schedules.length; i++) {
    for (let j = 0; j < schedules[i].length; j++) {
      const [start, end] = schedules[i][j];
      for (let k = start; k < end; k++) {
        clock[k] = -1;
      }
    }
  }

  let start = 0;
  for (let i = 0; i < clock.length; i++) {
    if (clock[i] === -1) {
      if (i > start) {
        result.push([start, i]);
      }
      start = i + 1;
    }
  }

  return result;
}

console.log(
  findMeetingSlots([
    [
      [13, 15],
      [11, 12],
      [10, 13],
    ], //schedule for member 1
    [[8, 9]], // schedule for member 2
    [[13, 18]], // schedule for member 3
  ])
);
