const Value = enum(u2) { zero, one, two };

test "enum ordinal value" {
    const expect = @import("std").testing.expect;

    try expect(@enumToInt(Value.zero) == 0);
    try expect(@enumToInt(Value.one) == 1);
    try expect(@enumToInt(Value.two) == 2);
}

const Suit = enum {
    clubs,
    spades,
    diamonds,
    hearts,
    pub fn isClubs(self: Suit) bool {
        return self == Suit.clubs;
    }
};

test "enum method" {
    const expect = @import("std").testing.expect;

    try expect(Suit.spades.isClubs() == Suit.isClubs(.spades));
}
