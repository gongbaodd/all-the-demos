#include "01pack/pack.h"

Pack::Pack(int volume)
{
    this->volume = volume;
}

int Pack::value()
{
    int sum = 0;
    for (auto item : items)
    {
        sum += item.value;
    }

    return sum;
}

Pack Pack::clone()
{
    Pack *newPack = new Pack(volume);
    for (auto item : items)
    {
        newPack->items.push_back(item);
    }
    return *newPack;
}