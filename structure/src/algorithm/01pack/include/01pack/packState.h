#ifndef __PACKSTATE_H__
#define __PACKSTATE_H__

#include "./pack.h"

class PackState
{
private:
    Pack *pack;
    std::vector<Pack> states;

public:
    PackState(Pack &pack);
    void putItem(Item item);
};

#endif