const std = @import("std");

const Child = enum {
    Left,
    Right,
};

pub const Tree = struct {
    left: ?*Tree,
    right: ?*Tree,
    value: u8,
    pub fn new(value: u8) Tree {
        return Tree{
            .left = null,
            .right = null,
            .value = value,
        };
    }
    pub fn insert(self: *Tree, value: u8, child: Child) void {
        switch (child) {
            Child.Left => self.left = &Tree.new(value),
            Child.Right => self.right = &Tree.new(value),
        }
    }
};

pub fn main() anyerror!void {
    var tree = Tree.new('A');
    tree.insert('B', Child.Left);
    if (tree.left) |b| {
        b.insert('C', Child.Left);
        b.insert('D', Child.Right);

        if (b.right) |d| {
            d.insert('E', Child.Left);
            d.insert('F', Child.Right);
        }
    }

    tree.insert('G', Child.Right);
    if (tree.right) |g| {
        g.insert('H', Child.Left);
    }
}
