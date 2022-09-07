struct Tree {
    left: Option<Box<Tree>>,
    right: Option<Box<Tree>>,
    value: String,
}

enum Child {
    Left,
    Right,
}

impl Tree {
    pub fn new(value: String) -> Tree {
        Tree {
            left: None,
            right: None,
            value,
        }
    }
    pub fn set_child(self: &mut Self, value: String, t: Child) {
        let child = Some(Box::new(Tree::new(value)));
        match t {
            Child::Left => self.left = child,
            Child::Right => self.right = child,
        }
    }
    pub fn iter(self: &Self, order: Order) -> TreeIter {
        TreeIter::new(self, order)
    }
    pub fn level_iter(&self) -> LevelIter {
        LevelIter::new(self)
    }
}

enum Order {
    Pre,
    In,
    Post,
}

struct TreeIter<'tree> {
    order: Order,
    stack: Vec<&'tree Tree>,
}
impl<'tree> TreeIter<'tree> {
    pub fn new(tree: &Tree, order: Order) -> TreeIter {
        match order {
            Order::Pre => TreeIter {
                stack: vec![tree],
                order,
            },
            Order::In => {
                let mut iter = TreeIter {
                    stack: vec![tree],
                    order,
                };

                while let Some(node) = &iter.stack.last().unwrap().left {
                    iter.stack.push(node);
                }

                iter
            }
            Order::Post => {
                let mut iter = TreeIter {
                    stack: vec![],
                    order,
                };
                let mut stack = vec![tree];

                while !stack.is_empty() {
                    let node = stack.pop().unwrap();
                    iter.stack.push(node);

                    if node.left.is_some() {
                        stack.push(node.left.as_ref().unwrap());
                    }

                    if node.right.is_some() {
                        stack.push(node.right.as_ref().unwrap());
                    }
                }

                iter
            }
        }
    }
}

impl<'tree> Iterator for TreeIter<'tree> {
    type Item = String;
    fn next(&mut self) -> Option<Self::Item> {
        if self.stack.is_empty() {
            return None;
        }

        let item = self.stack.pop().unwrap();

        match self.order {
            Order::Pre => {
                if item.right.is_some() {
                    self.stack.push(item.right.as_ref().unwrap());
                }

                if item.left.is_some() {
                    self.stack.push(item.left.as_ref().unwrap());
                }
            }
            Order::In => {
                if item.right.is_some() {
                    self.stack.push(item.right.as_ref().unwrap());
                    while let Some(node) = &self.stack.last().unwrap().left {
                        self.stack.push(node);
                    }
                }
            }
            Order::Post => {}
        };

        Some(item.value.to_owned())
    }
}

struct LevelIter<'tree> {
    stack: Vec<Vec<&'tree Tree>>,
}
impl<'tree> LevelIter<'tree> {
    pub fn new(tree: &'tree Tree) -> LevelIter {
        let mut iter = LevelIter {
            stack: vec![vec![tree]],
        };

        loop {
            let last_row = iter.stack.last().unwrap();
            let mut row: Vec<&'tree Tree> = vec![];
            last_row.iter().for_each(|&node| {
                if node.left.is_some() {
                    row.push(node.left.as_ref().unwrap());
                }

                if node.right.is_some() {
                    row.push(node.right.as_ref().unwrap());
                }
            });

            if row.is_empty() {
                break;
            }

            iter.stack.push(row);
        }

        iter.stack.reverse();

        iter
    }
}

impl<'tree> Iterator for LevelIter<'tree> {
    type Item = Vec<String>;
    fn next(&mut self) -> Option<Self::Item> {
        self.stack
            .pop()
            .map(|row| row.iter().map(|&tree| tree.value.to_owned()).collect())
    }
}

fn main() {
    let tree = test_value();

    let ins: Vec<String> = tree.iter(Order::In).collect();
    println!("in-order: {:?}", ins);

    let pres: Vec<String> = tree.iter(Order::Pre).collect();
    println!("pre-order: {:?}", pres);

    let posts: Vec<String> = tree.iter(Order::Post).collect();
    println!("post-order: {:?}", posts);

    let levels: Vec<Vec<String>> = tree.level_iter().collect();
    println!("level-order: {:?}", levels);
}

fn test_value() -> Tree {
    let mut root = Tree::new("A".to_string());
    root.set_child("B".to_string(), Child::Left);
    root.left
        .as_mut()
        .unwrap()
        .set_child("C".to_string(), Child::Left);

    root.left
        .as_mut()
        .unwrap()
        .set_child("D".to_string(), Child::Right);

    root.left
        .as_mut()
        .unwrap()
        .right
        .as_mut()
        .unwrap()
        .set_child("E".to_string(), Child::Left);

    root.left
        .as_mut()
        .unwrap()
        .right
        .as_mut()
        .unwrap()
        .set_child("F".to_string(), Child::Right);

    root.set_child("G".to_string(), Child::Right);

    root.right
        .as_mut()
        .unwrap()
        .set_child("H".to_string(), Child::Left);

    return root;
}
