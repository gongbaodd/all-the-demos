// [A Step by Step Guide to the Auto-Placement Algorithm in CSS Grid](https://idevie.com/web-development/a-step-by-step-guide-to-the-auto-placement-algorithm-in-css-grid#:~:text=A%20Step%20by%20Step%20Guide%20to%20the%20Auto-Placement,Placement%20of%20Remaining%20Items%20...%207%20Conclusion%20]

type Grid = Array<Array<number>>;
type Item = {
  id: number;
  style?: {
    gridRowStart?: number | string;
    gridRowEnd?: number | string;
    gridColumnStart?: number | string;
    gridColumnEnd?: number | string;
  };
};
type GridItem = {
  startRow: number;
  startColumn: number;
  endRow: number;
  endColumn: number;
  item?: ComputedItem;
};
type GridRow = {
  columnStart?: number;
  full?: boolean;
  data: GridItem[];
};
type Cursor = {
  rowStart: number;
  columnStart: number;
  direction: "left" | "right";
};
type ComputedItem = Item & {
  computed?: {
    width?: number;
    height?: number;
    direction?: "left" | "right";
    specified?: boolean;
    columnStart?: {
      span?: number;
      value?: number;
    };
    rowStart?: {
      span?: number;
      value?: number;
    };
    columnEnd?: {
      span?: number;
      value?: number;
    };
    rowEnd?: {
      span?: number;
      value?: number;
    };
  };
  position?: {
    rowStart: number;
    columnStart: number;
    rowEnd: number;
    columnEnd: number;
  };
};

function layout(
  rows: number,
  columns: number,
  items: Array<Item | ComputedItem>
): Grid {
  // your code here
  const grid = intialize();
  const cursor: Cursor = { rowStart: 1, columnStart: 0, direction: "left" };
  const pCursor: Cursor = { ...cursor }; // for specified cells

  items.sort((a, b) => {
    if (a.style && b.style) {
      // specified column number moves first
      const aStyle = a.style;
      const bStyle = b.style;
      const rowProps = "gridRowStart";
      const ahasRowProps = typeof aStyle[rowProps] === "number";
      const bhasRowProps = typeof bStyle[rowProps] === "number";

      if (ahasRowProps && !bhasRowProps) return -1;
      if (!ahasRowProps && bhasRowProps) return 1;
    }
    return 0;
  });

  while (items.length) {
    const item = items.shift();
    if (!item) break;
    const computedItem = "computed" in item ? item : calcItem(item);

    moveCursor(cursor, pCursor, computedItem);

    debug("computedItem", computedItem);
    // debug("cursor", cursor);
    // debug("pCursor", pCursor);

    const { positioned } = positionItem(cursor, computedItem);

    if (!positioned) {
      items.unshift(computedItem);
    }
  }

  return gridToArray(grid);

  function calcItem(item: Item): ComputedItem {
    if (item.style) {
      const computedItem: ComputedItem = {
        ...item,
        computed: {
          direction: "left",
        },
      };
      const { gridColumnStart, gridRowStart, gridColumnEnd, gridRowEnd } =
        item.style;

      if (typeof gridColumnStart === "string") {
        // CASE1:  gridColumnStart: 'span 2',
        const [_, value] = gridColumnStart.split(" ");
        computedItem.computed = {
          ...computedItem.computed,
          columnStart: {
            span: Number(value),
          },
          width: Number(value),
        };
      }

      if (typeof gridColumnStart === "number") {
        // CASE2: gridColumnStart: 2,
        computedItem.computed = {
          ...computedItem.computed,
          specified: true,
          columnStart: {
            value: gridColumnStart,
          },
        };
      }

      if (typeof gridColumnEnd === "string") {
        // CASE2: gridColumnEnd: 'span 2'
        const [_, value] = gridColumnEnd.split(" ");
        computedItem.computed = {
          ...computedItem.computed,
          columnEnd: {
            span: Number(value),
          },
          // use ColumnStart's span value
          width: computedItem.computed?.width || Number(value),
        };
      }

      if (typeof gridColumnEnd === "number") {
        // CASE6: gridColumnEnd: 4,
        computedItem.computed = {
          ...computedItem.computed,
          specified: true,
          direction: "right",
          columnEnd: {
            value: gridColumnEnd,
          },
        };
      }

      if (typeof gridRowStart === "number") {
        // CASE2: gridRowStart: 2,
        computedItem.computed = {
          ...computedItem.computed,
          specified: true,
          rowStart: {
            value: gridRowStart,
          },
        };
      }

      if (typeof gridRowStart === "string") {
        // CASE9: gridRowStart:  'span 2',
        const [_, value] = gridRowStart.split(" ");
        computedItem.computed = {
          ...computedItem.computed,
          rowStart: {
            span: Number(value),
          },
          height: Number(value),
        };
      }

      if (typeof gridRowEnd === "number") {
        // CASE10: gridRowEnd: 3,
        computedItem.computed = {
          ...computedItem.computed,
          specified: true,
          rowEnd: {
            value: gridRowEnd,
          },
        };
      }

      if (typeof gridRowEnd === "string") {
        // CASE7:  gridRowEnd: 'span 2',
        const [_, value] = gridRowEnd.split(" ");

        computedItem.computed = {
          ...computedItem.computed,
          rowEnd: {
            span: Number(value),
          },
          height: Number(value),
        };
      }

      return computedItem;
    } else {
      return item;
    }
  }

  /**
   * Add 1 to column if is full Add 1 to row
   * @param cursor
   * @param item
   */
  function moveCursor(cursor: Cursor, pCursor: Cursor, item: ComputedItem) {
    if (item.style) {
      const pointer = item.computed?.specified ? pCursor : cursor;
      const computedColumnEnd = calcColumnEnd(pointer);

      if (computedColumnEnd > columns + 1) {
        pointer.rowStart++;
        pointer.columnStart = 1;
      } else {
        pointer.columnStart++;

        if (pointer.columnStart === columns + 1) {
          pointer.rowStart++;
          pointer.columnStart = 1;
        }
      }

      if (pointer.rowStart > rows) {
        throw new Error("Grid is full");
      }

      return;
    }

    if (cursor.columnStart + 1 > columns + 1) {
      cursor.rowStart++;
      cursor.columnStart = 1;
    } else {
      cursor.columnStart++;

      if (cursor.columnStart === columns + 1) {
        cursor.rowStart++;
        cursor.columnStart = 1;
      }
    }

    function calcColumnEnd(pointer: Cursor) {
      // next cursor + item width
      if (item.computed?.width) {
        return pointer.columnStart + item.computed.width + 1;
      }
      return pointer.columnStart + 1;
    }
  }

  function positionItem(cursor: Cursor, item: ComputedItem) {
    // const { rowStart, columnStart } = cursor;
    let rowStart = calcRowStart();
    let columnStart = calcColumnStart();
    let rowEnd = calcRowEnd();
    let columnEnd = calcColumnEnd();

    debug(
      "rowStart",
      rowStart,
      "columnStart",
      columnStart,
      "rowEnd",
      rowEnd,
      "columnEnd",
      columnEnd
    );

    let rowFull = grid[rowStart - 1].full;
    if (rowFull) {
      return {
        positioned: false,
      };
    }

    let rColumnStart = grid[rowStart - 1].columnStart;
    if (rColumnStart && rColumnStart > columnStart) {
      return {
        positioned: false,
      };
    }

    const gItems = grid
      .filter(({ data: row }) => {
        const [{ startRow, endRow }] = row;
        return startRow >= rowStart && endRow <= rowEnd;
      })
      .map(({ data: row }) => {
        return row.filter((item) => {
          const { startColumn, endColumn } = item;
          return startColumn >= columnStart && endColumn <= columnEnd;
        });
      });

    let occupied = gItems.some((row) =>
      row.some((i) => {
        return i.item;
      })
    );

    if (!occupied) {
      gItems.forEach((row) => {
        row.forEach((i) => {
          i.item = item;
        });
      });

      item.position = {
        rowStart,
        columnStart,
        rowEnd,
        columnEnd,
      };

      if (item.computed?.columnStart?.value) {
        if (!item.computed?.columnEnd?.value) {
          if (!item.computed?.rowStart?.value) {
            const row = grid[rowEnd - 2];
            row.columnStart = columnStart;
            if (row.data[row.data.length - 1].item) {
              row.full = true;
            }
            for (let i = 0; i < rowEnd - 2; i++) {
              grid[i].full = true;
            }
          }
        }
      } else if (item.computed?.columnEnd?.value) {
        const row = grid[rowEnd - 2];
        for (let i = 0; i < rowEnd - 1; i++) {
          grid[i].full = true;
        }
      }

      return { positioned: true };
    }

    return { positioned: false };

    function calcRowStart() {
      if (item.computed) {
        if (item.computed.rowStart?.value) {
          // CASE2: gridRowStart: 2,
          const rowStart = item.computed.rowStart.value;
          return rowStart;
        }

        if (item.computed.columnStart?.value) {
          const columnStart = item.computed.columnStart.value;
          const row = grid[pCursor.rowStart - 1];
          if (row.columnStart) {
            if (columnStart > row.columnStart) {
              return pCursor.rowStart;
            } else {
              return pCursor.rowStart + 1;
            }
          }
        }

        return item.computed.specified ? pCursor.rowStart : cursor.rowStart;
      }

      let rowStart = cursor.rowStart;

      return rowStart;
    }

    function calcColumnStart() {
      if (item.computed) {
        if (item.computed.columnStart?.value) {
          // CASE10: gridColumnStart: 2,
          return item.computed.columnStart.value;
        }

        if (item.computed.columnEnd?.value && item.computed.width) {
          // CASE6: gridColumnEnd: 4,
          return item.computed.columnEnd.value - item.computed.width;
        }

        return item.computed.specified
          ? pCursor.columnStart
          : cursor.columnStart;
      }
      return cursor.columnStart;
    }

    function calcRowEnd() {
      if (item.computed) {
        if (item.computed.rowEnd?.value) {
          // CASE10: gridRowEnd: 3,
          return item.computed.rowEnd.value;
        }

        if (item.computed.height) {
          return rowStart + item.computed.height;
        }
      }
      return rowStart + 1;
    }

    function calcColumnEnd() {
      if (item.computed) {
        if (item.computed.width) {
          return columnStart + item.computed.width;
        }

        if (item.computed.columnEnd?.value) {
          // CASE10: gridColumnEnd: 3,
          return item.computed.columnEnd.value;
        }
      }
      return columnStart + 1;
    }
  }

  function intialize(): GridRow[] {
    const grid: GridRow[] = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = {
        data: [],
      };
      for (let j = 0; j < columns; j++) {
        const startRow = i + 1;
        const startColumn = j + 1;
        const endRow = startRow + 1;
        const endColumn = startColumn + 1;
        grid[i].data[j] = {
          startRow,
          startColumn,
          endRow,
          endColumn,
        };
      }
    }
    return grid;
  }

  function gridToArray(grid: GridRow[]): Grid {
    const arr: Grid = [];
    grid.forEach(({ data: $row }) => {
      const row = $row.map((i) => i.item?.id || 0);
      arr.push(row);
    });
    return arr;
  }
}

const test1 = layout(2, 5, [
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
]);

debug(test1, "A");

function debug(...args: any[]) {
  const last = args[args.length - 1];
  console.log(...args);
}
