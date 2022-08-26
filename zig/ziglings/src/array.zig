const std = @import("std");

pub fn main() anyerror!void {
    const le = [_]u8{ 1, 3 };
    const et = [_]u8{ 3, 7 };
    const leet = le ++ et;
    const bit_pattern = [_]u8{ 1, 0, 0, 1 } ** 3;

    std.debug.print("LEET: ", .{});

    for (leet) |n| {
        std.debug.print("LEET:  {}", .{n});
    }

    std.debug.print(", Bits: ", .{});

    for (bit_pattern) |n| {
        std.debug.print("{}", .{n});
    }

    std.debug.print("\n", .{});
}

test "basic test" {
    try std.testing.expectEqual(10, 3 + 7);
}
