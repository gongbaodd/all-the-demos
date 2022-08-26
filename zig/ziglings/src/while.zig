const std = @import("std");

pub fn main() anyerror!void {
    var n: u32 = 2;

    while (n < 1000) : (n = n * 2) {
        std.debug.print("{} ", .{n});
    }

    std.debug.print("n={}\n", .{n});
}

test "basic test" {
    try std.testing.expectEqual(10, 3 + 7);
}
