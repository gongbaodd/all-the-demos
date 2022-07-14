#ifndef __PACK_H__
#define __PACK_H__

#include <vector>
#include "./item.h"

class Pack
{
public:
    int volume;
    std::vector<Item> items;
    Pack(int volume);
    int value();
    Pack clone();
};
#endif