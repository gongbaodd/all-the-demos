const std = @import("std");
const ArrayList = std.ArrayList;
const allocator = std.heap.page_allocator;

pub fn main() anyerror!void {
    var result = ArrayList(usize).init(allocator);
    defer result.deinit();

    const str = "ababcabcacbababcac";
    const word = "abcac";
    try kmp(str, word, &result);

    std.debug.print("{any}", .{result.items});
}

fn kmp(str: []const u8, word: []const u8, res: *ArrayList(usize)) anyerror!void {
    var next = ArrayList(usize).init(allocator);
    defer next.deinit();

    for (word) |_, inext| {
        if (inext == 0) {
            try next.append(0);
            continue;
        }

        var imatched = next.items[inext - 1];
        while (imatched > 0 and word[imatched] != word[inext]) {
            imatched = next.items[imatched - 1];
        }

        if (word[imatched] == word[inext]) {
            try next.append(imatched + 1);
        } else {
            try next.append(imatched);
        }
    }

    std.debug.print("{any}", .{next.items});

    _ = str;
    _ = res;

    // ababcabcacbababcac
    // abcac
    // 00010
    var iword: usize = 0;
    for (str) |c, istr| {
        while (c != word[iword] and iword > 0) {
            iword = next.items[iword - 1];
        }

        if (c == word[iword]) {
            iword += 1;
        }

        if (iword == word.len) {
            try res.append(istr - iword + 1);
            iword = next.items[iword - 1];
        }
    }
}
