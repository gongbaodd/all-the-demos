const Res = enum { int, float, bool };

const Result = union(Res) {
    int: u8,
    float: f64,
    bool: bool,
};

test "simple union" {
    var result = Result{ .int = 120 };

    switch (result) {
        .int => |*byte| byte.* += 1,
        .float => |*float| float.* *= 2,
        .bool => |*b| b.* = !b.*,
    }

    const expect = @import("std").testing.expect;
    try expect(result.int == 121);
}
