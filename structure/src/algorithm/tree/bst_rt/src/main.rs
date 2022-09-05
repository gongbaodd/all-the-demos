use std::ops::DerefMut;

pub struct BinarySearchTree<T>
where
    T: Ord,
{
    value: Option<T>,
    left: Option<Box<BinarySearchTree<T>>>,
    right: Option<Box<BinarySearchTree<T>>>,
}

enum Traverse {
    NLR,
    LRN,
    LNR,
}

impl<T> BinarySearchTree<T>
where
    T: Ord,
{
    pub fn new() -> BinarySearchTree<T> {
        BinarySearchTree {
            value: None,
            left: None,
            right: None,
        }
    }

    pub fn from(data: Vec<T>) -> BinarySearchTree<T> {
        let mut root = BinarySearchTree::new();

        for v in data {
            root.insert(v);
        }

        root
    }

    pub fn insert(self: &mut Self, v: T) {
        match &self.value {
            None => self.value = Some(v),
            Some(value) => {
                if v < *value {
                    match self.left {
                        None => {
                            let mut node = BinarySearchTree::new();
                            node.insert(v);
                            self.left = Some(Box::new(node));
                        }
                        Some(ref mut left) => left.insert(v),
                    }
                } else {
                    match self.right {
                        None => {
                            let mut node = BinarySearchTree::new();
                            node.insert(v);
                            self.left = Some(Box::new(node));
                        }
                        Some(ref mut right) => right.insert(v),
                    }
                }
            }
        }
    }

    // fn traverse(&self, t: Traverse) -> Vec<T> {
    //     let mut res = vec![];
    //     let next = |node: &BinarySearchTree<T>| match t {
    //         Traverse::LNR => match &node.left {
    //             None => {
    //                 res.push(&node.value.unwrap());
    //             }
    //             Some(left) => {}
    //         },
    //         Traverse::LRN => {}
    //         Traverse::NLR => {}
    //     };

    //     next(self);

    //     res
    // }
}

struct BinarySearchTreeIter<'a, T>
where
    T: Ord,
{
    stack: Vec<&'a BinarySearchTree<T>>,
}

impl<'a, T> BinarySearchTreeIter<'a, T>
where
    T: Ord,
{
    pub fn new(tree: &BinarySearchTree<T>) -> BinarySearchTreeIter<T> {
        let mut iter = BinarySearchTreeIter { stack: vec![tree] };
        iter.stack_push_left();
        iter
    }

    fn stack_push_left(&mut self) {
        while let Some(child) = &self.stack.last().unwrap().left {
            self.stack.push(child);
        }
    }
}

impl<'a, T> Iterator for BinarySearchTreeIter<'a, T>
where
    T: Ord,
{
    type Item = &'a T;

    fn next(&mut self) -> Option<&'a T> {
        if self.stack.is_empty() {
            None
        } else {
            let node = self.stack.pop().unwrap();
            if node.right.is_some() {
                self.stack.push(node.right.as_ref().unwrap());
                self.stack_push_left();
            }
            node.value.as_ref()
        }
    }
}

// from
// traversal{pre_orderNLR, post_orderLRN, in_orederLNR}
// treeDepth
// print
// insert node or tree
// delete node or tree

pub fn main() {
    let _data = vec![6, 2, 8, 1, 4];
    let _tree = BinarySearchTree::from(_data);
}
