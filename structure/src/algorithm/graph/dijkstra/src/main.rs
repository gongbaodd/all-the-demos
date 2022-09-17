use std::{
    cmp::Reverse,
    collections::{BTreeMap, BinaryHeap},
    ops::Add,
};

// type Graph<V, E> = BTreeMap<V, BTreeMap<V, E>>;

struct Graph {
    nodes: BTreeMap<i32, BTreeMap<i32, usize>>,
}

impl Graph {
    fn new() -> Graph {
        Graph {
            nodes: BTreeMap::new(),
        }
    }

    fn edge(&mut self, v1: i32, v2: i32, weight: usize) {
        self.nodes
            .entry(v1)
            .or_insert_with(BTreeMap::new)
            .insert(v2, weight);

        self.nodes
            .entry(v2)
            .or_insert_with(BTreeMap::new)
            .insert(v1, weight);
    }
    fn dijkstra(&self, start: i32) -> BTreeMap<i32, Option<(i32, usize)>> {
        let mut ans = BTreeMap::new();
        let mut prio = BinaryHeap::new();

        ans.insert(start, None);

        for (&new, &weight) in self.nodes.get(&start).unwrap() {
            ans.insert(new, Some((start, weight)));
            prio.push(Reverse((weight, new, start)));
        }

        while let Some(Reverse((dist_new, new, prev))) = prio.pop() {
            match ans[&new] {
                Some((p, d)) if p == prev && d == dist_new => {}
                _ => continue,
            }

            for (next, weight) in &self.nodes[&new] {
                match ans.get(next) {
                    Some(Some((_, dist_next))) if dist_new + weight >= *dist_next => {}
                    Some(None) => {}
                    _ => {
                        ans.insert(*next, Some((new, weight + dist_new)));
                        prio.push(Reverse((weight + dist_new, *next, new)));
                    }
                }
            }
        }

        ans
    }
}

fn main() {
    let mut graph = Graph::new();
    let raw = [
        [0, 1, 4],
        [0, 2, 6],
        [0, 3, 6],
        [1, 2, 1],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 4],
        [3, 2, 2],
        [3, 5, 5],
        [4, 6, 6],
        [5, 4, 1],
        [5, 6, 8],
    ];
    for [v1, v2, edge] in raw {
        graph.edge(v1, v2, edge as usize);
    }
    println!("{:?}", graph.nodes);
    println!("{:?}", graph.dijkstra(0))
}
