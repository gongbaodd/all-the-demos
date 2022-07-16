#include <gtest/gtest.h>
#include "01pack/packState.h"

TEST(pack, contructor)
{
    int PACK_VOLUME = 10;
    Pack pack(PACK_VOLUME);
    EXPECT_EQ(PACK_VOLUME, pack.volume);

    PackState state(pack);

    std::vector<Item> items = {
        Item(2, 6),
        Item(2, 3),
        Item(6, 5),
        Item(5, 4),
        Item(4, 6),
    };

    for (auto item : items)
    {
        state.putItem(item);
    }

    EXPECT_EQ(15, pack.value());
}