const std = @import("std");

pub fn main() anyerror!void {
    const MyNumberError = error{TooSmall};

    var my_number: MyNumberError!u8 = 5;

    my_number = MyNumberError.TooSmall;
}

test "basic test" {
    try std.testing.expectEqual(10, 3 + 7);
}
