const Vec3 = struct {
    x: f32,
    y: f32,
    z: f32,
    fn swapXY(self: *Vec3) void {
        const tmp = self.x;
        self.x = self.y;
        self.y = tmp;
    }
};

test "struct usage" {
    const expect = @import("std").testing.expect;

    var my_vector = Vec3{
        .x = 0,
        .y = 100,
        .z = 50,
    };

    _ = my_vector;

    my_vector.swapXY();

    try expect(my_vector.x == 100);
    try expect(my_vector.y == 0);
}
