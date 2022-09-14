use std::cmp::Reverse;
use std::collections::{BTreeMap, BinaryHeap};
use std::ops::Add;

type Graph<V, E> = BTreeMap<V, BTreeMap<V, E>>;

fn add_edge<V: Ord + Copy, E: Ord + Add + Copy>(graph: &mut Graph<V, E>, v1: V, v2: V, cost: E) {
    graph
        .entry(v1)
        .or_insert_with(BTreeMap::new)
        .insert(v2, cost);
    graph
        .entry(v2)
        .or_insert_with(BTreeMap::new)
        .insert(v1, cost);
}

pub fn prim<V: Ord + Copy + std::fmt::Debug, E: Ord + Add + Copy + std::fmt::Debug>(
    graph: &Graph<V, E>,
) -> Graph<V, E> {
    match graph.keys().next() {
        Some(&v) => prim_with_start(graph, v),
        None => Graph::new(),
    }
}

pub fn prim_with_start<V: Ord + Copy, E: Ord + Add + Copy>(
    graph: &Graph<V, E>,
    start: V,
) -> Graph<V, E> {
    let mut mst = Graph::<V, E>::new();
    let mut prio = BinaryHeap::new();

    mst.insert(start, BTreeMap::new());

    for (v, c) in &graph[&start] {
        prio.push(Reverse((*c, v, start)));
    }

    while let Some(Reverse((cost, t, prev))) = prio.pop() {
        if mst.contains_key(t) {
            continue;
        }

        add_edge(&mut mst, prev, *t, cost);

        for (v, c) in &graph[t] {
            if !mst.contains_key(v) {
                prio.push(Reverse((*c, v, *t)));
            }
        }
    }

    mst
}

fn main() {
    let mut graph = Graph::new();

    add_edge(&mut graph, 0, 1, 5);
    add_edge(&mut graph, 0, 2, 1);
    add_edge(&mut graph, 0, 3, 2);
    add_edge(&mut graph, 1, 2, 3);
    add_edge(&mut graph, 1, 4, 4);
    add_edge(&mut graph, 2, 3, 6);
    add_edge(&mut graph, 2, 4, 2);
    add_edge(&mut graph, 3, 4, 3);

    println!("{:?}", &graph);
    println!("{:?}", prim(&graph));

    let mut test = Graph::new();

    add_edge(&mut test, 0, 2, 1);
    add_edge(&mut test, 0, 3, 2);
    add_edge(&mut test, 1, 2, 3);
    add_edge(&mut test, 2, 4, 2);

    println!("{:?}", &test);
}
