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

type ComputedItem = {
  computed?: {
    values?: {
      rows?: {
        start?: number;
        end?: number;
      };
      columns?: {
        start?: number;
        end?: number;
      };
    };
    spans?: {
      width?: number;
      height?: number;
    };
  };
} & Item;

type GridColumn = {
  rows: {
    start: number;
    end: number;
  };
  columns: {
    start: number;
    end: number;
  };
  item?: ComputedItem;
};

type GridRow = {
  columns: GridColumn[];
};

type Cursor = {
  row: number;
  column: number;
};

function layout(rows: number, columns: number, items: Array<Item>): Grid {
  // your code here
  const grid = init(rows, columns);

  const computedItems = items.map(toComputedItem).sort((a, b) => {
    // if a and b both don't have column value
    // put the one with row value to the front
    if (!a.computed?.values?.columns && !b.computed?.values?.columns) {
      if (a.computed?.values?.rows && !b.computed?.values?.rows) {
        return -1;
      }
      if (!a.computed?.values?.rows && b.computed?.values?.rows) {
        return 1;
      }
    }
    return 0;
  });

  while (computedItems.length) {
    const item = computedItems.shift();

    if (item?.computed?.values) {
      const cursor: Cursor = initCursor();
      let done = false;
      while (!done) {
        done = putPosItem(item!, cursor);
        moveCursor(cursor, cursor.row, cursor.column + 1);
      }
    } else {
      const autoCursor: Cursor = initCursor();
      let done = false;

      while (!done) {
        done = putAutoItem(item!, autoCursor);
        moveCursor(autoCursor, autoCursor.row, autoCursor.column + 1);
      }
    }
  }

  return toArray(grid);

  function putPosItem(item: ComputedItem, cursor: Cursor): boolean {
    const { row, column } = cursor;
    const width = item.computed?.spans?.width || 1;
    const height = item.computed?.spans?.height || 1;

    let minRow = item.computed?.values?.rows?.start || row;
    if (!item.computed?.values?.rows?.start) {
      if (item.computed?.values?.rows?.end) {
        minRow = item.computed?.values?.rows?.end - height;
      }
    }

    const maxRow = item.computed?.values?.rows?.end || minRow + height;

    let minCol = item.computed?.values?.columns?.start || column;
    if (!item.computed?.values?.columns?.start) {
      if (item.computed?.values?.columns?.end) {
        minCol = item.computed?.values?.columns?.end - width;
      }
    }

    const maxCol = item.computed?.values?.columns?.end || minCol + width;

    if (maxCol > columns + 1) {
      return false;
    }

    const positions = getPositions({
      minRow,
      maxRow,
      minCol,
      maxCol,
    });

    const occupied = ifOccupied(positions);

    if (occupied) {
      return false;
    }

    putItem(positions, item);

    return true;
  }

  function putAutoItem(item: ComputedItem, cursor: Cursor): boolean {
    const { row, column } = cursor;
    const width = item.computed?.spans?.width || 1;
    const height = item.computed?.spans?.height || 1;
    const minRow = row;
    const maxRow = row + height;
    const minCol = column;
    const maxCol = column + width;

    if (maxCol > columns + 1) {
      return false;
    }

    const positions = getPositions({
      minRow,
      maxRow,
      minCol,
      maxCol,
    });

    const occupied = ifOccupied(positions);

    if (occupied) {
      return false;
    }

    putItem(positions, item);

    return true;
  }

  function getPositions({
    minRow = 0,
    maxRow = rows,
    minCol = 0,
    maxCol = columns,
  }) {
    const positions = grid
      .filter(({ columns }) => {
        const [column] = columns;
        const { rows } = column;
        const { start, end } = rows;
        return start >= minRow && end <= maxRow;
      })
      .map(({ columns }) => {
        return columns.filter(({ columns }) => {
          const { start, end } = columns;
          return start >= minCol && end <= maxCol;
        });
      });
    return positions;
  }

  function putItem(
    positions: ReturnType<typeof getPositions>,
    item: ComputedItem
  ) {
    positions.forEach((position) => {
      position.forEach((column) => {
        column.item = item;
      });
    });
  }

  function ifOccupied(positions: ReturnType<typeof getPositions>) {
    return positions.some((position) => {
      return position.some((column) => {
        return column.item;
      });
    });
  }

  function toComputedItem(item: Item): ComputedItem {
    type ComputedOption = Required<ComputedItem>["computed"];

    if (item.style) {
      const { gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd } =
        item.style;
      const [rowStart, rowStartSpan] = toComputedData(gridRowStart);
      const [rowEnd, rowEndSpan] = toComputedData(gridRowEnd);
      const [columnStart, columnStartSpan] = toComputedData(gridColumnStart);
      const [columnEnd, columnEndSpan] = toComputedData(gridColumnEnd);
      const computed: ComputedOption = {};

      toComputedValues();
      toComputedSpans();

      return {
        ...item,
        computed,
      };

      function toComputedValues() {
        if (rowStart) {
          computed.values = computed.values || {};
          computed.values.rows = computed.values.rows || {};
          computed.values.rows.start = rowStart;
        }

        if (rowEnd) {
          computed.values = computed.values || {};
          computed.values.rows = computed.values.rows || {};
          computed.values.rows.end = rowEnd;
        }

        if (columnStart) {
          computed.values = computed.values || {};
          computed.values.columns = computed.values.columns || {};
          computed.values.columns.start = columnStart;
        }

        if (columnEnd) {
          computed.values = computed.values || {};
          computed.values.columns = computed.values.columns || {};
          computed.values.columns.end = columnEnd;
        }
      }

      function toComputedSpans() {
        if (rowStartSpan || rowEndSpan) {
          computed.spans = computed.spans || {};
          computed.spans.height = rowStartSpan || rowEndSpan;
        }

        if (columnStartSpan || columnEndSpan) {
          computed.spans = computed.spans || {};
          computed.spans.width = columnStartSpan || columnEndSpan;
        }
      }
    }

    return item;
  }

  function toComputedData(value: Required<Item>["style"]["gridRowStart"]) {
    if (typeof value === "number") {
      return [value, undefined];
    }

    if (typeof value === "string") {
      const [_, v] = value.split(" ");
      return [undefined, Number(v)];
    }

    return [undefined, undefined];
  }

  function initCursor(): Cursor {
    return {
      row: 1,
      column: 1,
    };
  }

  function moveCursor(cursor: Cursor, row: number, column: number) {
    if (column > columns) {
      cursor.row = row + 1;
      cursor.column = 1;
      return;
    }

    cursor.row = row;
    cursor.column = column;
  }

  function init(rows: number, columns: number): GridRow[] {
    const grid: GridRow[] = [];
    for (let i = 0; i < rows; i++) {
      const gridRow: GridRow = { columns: [] };
      grid.push(gridRow);
      for (let j = 0; j < columns; j++) {
        const row = { start: i + 1, end: i + 2 };
        const column = { start: j + 1, end: j + 2 };
        const gridColumn: GridColumn = { rows: row, columns: column };
        gridRow.columns.push(gridColumn);
      }
    }
    return grid;
  }

  function toArray(grid: GridRow[]): number[][] {
    return grid.map(({ columns }) => columns.map(({ item }) => item?.id || 0));
  }
}
