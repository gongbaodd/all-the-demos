const std = @import("std");

var tick: isize = 0;

pub fn main() !void {
    var thread = try std.Thread.spawn(.{}, ticker, .{@as(u8, 1)});
    _ = thread;

    std.debug.print("{d}", .{tick});

    std.time.sleep(3 * std.time.ns_per_s / 2);

    std.debug.print("{d}", .{tick});
}

fn ticker(step: u8) void {
    while (true) {
        std.time.sleep(1 * std.time.ns_per_s);
        tick += @as(isize, step);
    }
}
