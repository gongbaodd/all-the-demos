class MinHeap<V = number, E = number> {
  stack: [V, V, E][] = [];
  #sort() {
    let root = 0;
    const last = this.stack.length - 1;

    while (1) {
      const left = 2 * root + 1;
      const right = 2 * root + 2;
      let min = root;

      if (left > last) break;

      if (right > last) {
        min = left;
      } else {
        const [, , rEl] = this.stack[right];
        const [, , lEl] = this.stack[left];
        min = rEl < lEl ? right : left;
      }

      const [, , mEl] = this.stack[min];
      const [, , rEl] = this.stack[root];
      if (mEl < rEl) {
        [this.stack[root], this.stack[min]] = [
          this.stack[min],
          this.stack[root],
        ];
      }

      root = min;
    }
  }
  push(v1: V, v2: V, edge: E) {
    this.stack.push([v1, v2, edge]);
    this.#sort();
  }
  pop(): [V, V, E] | undefined {
    const data = this.stack.shift();
    this.#sort();
    return data;
  }
}

class Graph<V = number, E = number> {
  conn = new Map<V, Map<V, E>>();

  edge(v1: V, v2: V, weight: E) {
    if (!this.conn.get(v1)) this.conn.set(v1, new Map<V, E>());
    if (!this.conn.get(v2)) this.conn.set(v2, new Map<V, E>());

    this.conn.get(v1)?.set(v2, weight);
    this.conn.get(v2)?.set(v1, weight);
  }

  prim() {
    const mst = new Graph<V, E>();
    const iter = this.conn.entries();
    const [start, sConn] = iter.next().value;
    const priorQueue = new MinHeap<V, E>();

    for (const [v, e] of sConn) {
      priorQueue.push(start, v, e);
    }

    let least = priorQueue.pop();
    while (least) {
      const [n1, n2, edge] = least;

      if (mst.conn.has(n2)) {
        least = priorQueue.pop();
        continue;
      }

      mst.edge(n1, n2, edge);

      for (const [v, e] of this.conn.get(n2)!) {
        if (!mst.conn.has(v)) {
          priorQueue.push(n2, v, e);
        }
      }

      least = priorQueue.pop();
    }

    return mst;
  }
}

const grap = new Graph();
grap.edge(0, 1, 5);
grap.edge(0, 2, 1);
grap.edge(0, 3, 2);
grap.edge(1, 2, 3);
grap.edge(1, 4, 4);
grap.edge(2, 3, 6);
grap.edge(2, 4, 2);
grap.edge(3, 4, 3);

console.log(grap);

console.log(grap.prim());

const test = new Graph();
test.edge(0, 2, 1);
test.edge(0, 3, 2);
test.edge(1, 2, 3);
test.edge(2, 4, 2);

console.log(test);
