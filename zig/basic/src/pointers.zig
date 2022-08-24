fn increment(num: *u8) void {
    num.* += 1;
}

test "pointers" {
    const expect = @import("std").testing.expect;

    var x: u8 = 1;
    increment(&x);
    try expect(x == 2);
}
