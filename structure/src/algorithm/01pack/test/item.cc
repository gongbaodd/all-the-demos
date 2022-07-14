#include <gtest/gtest.h>
#include "01pack/item.h"

TEST(item, contructor)
{
    Item *item = new Item(1, 1);
    EXPECT_EQ(item->value, 1);
    EXPECT_EQ(item->weight, 1);
}