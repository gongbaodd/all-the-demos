#include "01pack/pack.h"
#include "01pack/item.h"
#include "01pack/packState.h"
#include "vector"
#include <iostream>

int main()
{
    int PACK_VOLUME = 10;

    Pack pack(PACK_VOLUME);
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

    std::cout << "价值" << pack.value() << std::endl;
    for (auto item : pack.items)
    {
        std::cout << item.weight << " " << item.value << std::endl;
    }

    return 0;
}