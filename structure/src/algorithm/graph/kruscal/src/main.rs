use std::{collections::BTreeMap, default, fmt::Debug};

type V = i32;

struct Graph {
    edges: Vec<(V, V, usize)>,
    vertice: Vec<V>,
}

impl Graph {
    fn new() -> Graph {
        Graph {
            edges: vec![],
            vertice: vec![],
        }
    }

    fn insert(&mut self, (v1, v2, weight): (V, V, usize)) {
        if !self.vertice.contains(&v1) {
            self.vertice.push(v1);
        }

        if !self.vertice.contains(&v2) {
            self.vertice.push(v2);
        }

        let mut inserted = false;

        for i in 0..self.edges.len() {
            if weight < self.edges[i].2 {
                self.edges.insert(i, (v1, v2, weight));
                inserted = true;
                break;
            }
        }

        if !inserted {
            self.edges.push((v1, v2, weight));
        }
    }

    fn kruskal(&self) -> Graph {
        let mut mst = Graph::new();
        let mut dsu = DisjointSetUnion::new(&self.vertice);

        for &(start, end, weight) in &self.edges {
            let r1 = dsu.findRoot(start);
            let r2 = dsu.findRoot(end);

            if r1 != r2 {
                println!("{:?}.root:{:?}", start, r1);
                println!("{:?}.root:{:?}", end, r2);
                mst.insert((start, end, weight));
                dsu.union(r1, r2);

                println!("{:?}", (start, end, weight));
                println!("{:?}", dsu.nodes);
            }
        }

        mst
    }
}

struct DisjointSetUnion {
    nodes: BTreeMap<i32, V>,
}

impl DisjointSetUnion {
    fn new(vetice: &Vec<V>) -> DisjointSetUnion {
        let mut union = DisjointSetUnion {
            nodes: BTreeMap::new(),
        };

        for &vertex in vetice {
            let parent = vertex;

            union.nodes.insert(vertex, parent);
        }

        union
    }

    fn findRoot(&self, mut node: V) -> V {
        let mut parent = self.nodes.get(&node).unwrap();

        println!("===findRoot {:?}", node);

        while node != *parent {
            println!("{:?}.parent:{:?}", node, parent);
            println!("{:?}", self.nodes);
            node = *parent;
            parent = self.nodes.get(&node).unwrap();
        }

        node
    }

    fn union(&mut self, v1: V, v2: V) {
        println!("===union {:?}.parent = {:?}", v2, v1);
        self.nodes.insert(v2, v1);
        println!("{:?}", self.nodes);
    }
}

pub fn main() {
    let mut graph = Graph::new();
    graph.insert((0, 1, 5));
    graph.insert((0, 2, 1));
    graph.insert((0, 3, 2));
    graph.insert((1, 2, 3));
    graph.insert((2, 3, 6));
    graph.insert((1, 4, 4));
    graph.insert((2, 4, 2));
    graph.insert((3, 4, 3));

    println!("{:?}", graph.edges);
    println!("{:?}", graph.vertice);
    let kruskal = graph.kruskal().edges;
    println!("{:?}", kruskal);

    let mut test = Graph::new();
    test.insert((0, 2, 1));
    test.insert((0, 3, 2));
    test.insert((1, 2, 3));
    test.insert((2, 4, 2));
    println!("{:?}", test.edges);
}
