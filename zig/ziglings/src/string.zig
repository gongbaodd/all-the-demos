const std = @import("std");

pub fn main() anyerror!void {
    const lyrics =
        \\Ziggy played guitar
        \\Jamming good with Andrew Kelley
        \\And the Spiders from Mars
    ;

    std.debug.print("{s}\n", .{lyrics});
}

test "basic test" {
    try std.testing.expectEqual(10, 3 + 7);
}
