pub struct BinarySearchTree {
    value: Option<i32>,
    left: Option<Box<BinarySearchTree>>,
    right: Option<Box<BinarySearchTree>>,
}

impl BinarySearchTree {
    pub fn new() -> BinarySearchTree {
        BinarySearchTree {
            value: None,
            left: None,
            right: None,
        }
    }
    pub fn from(data: Vec<i32>) -> BinarySearchTree {
        let mut tree = BinarySearchTree::new();
        for v in data {
            tree.insert(v);
        }
        tree
    }
    pub fn insert(self: &mut Self, value: i32) {
        if self.value.is_none() {
            self.value = Some(value);
            return;
        }

        let target = if value > self.value.unwrap() {
            &mut self.right
        } else {
            &mut self.left
        };

        if target.is_none() {
            let mut node = BinarySearchTree::new();
            node.value = Some(value);
            *target = Some(Box::new(node));
            return;
        }

        target.as_mut().unwrap().insert(value);
    }
}

// from
// traversal{pre_orderNLR, post_orderLRN, in_orederLNR}
// treeDepth
// treeWidth
// print
// insert node or tree
// delete node or tree

pub fn main() {
    let _data = vec![6, 2, 8, 1, 4];
    let _tree = BinarySearchTree::from(_data);
}
