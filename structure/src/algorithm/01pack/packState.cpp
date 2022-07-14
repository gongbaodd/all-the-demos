#include "01pack/packState.h"
#include <iostream>

PackState::PackState(Pack &pack)
{
    this->pack = &pack;

    for (int i = 0; i <= pack.volume; i++)
    {
        states.push_back(Pack(i));
    }
}

void PackState::putItem(Item item)
{
    if (item.weight > pack->volume)
    {
        return;
    }

    std::vector<Pack> newStates;
    for (auto state : states)
    {
        if (item.weight <= state.volume)
        {
            Pack oldState = states.at(state.volume - item.weight).clone();
            if (oldState.value() + item.value > state.value())
            {
                oldState.items.push_back(item);
                oldState.volume = state.volume;
                newStates.push_back(oldState);
            }
            else
            {
                newStates.push_back(state.clone());
            }
        }
        else
        {
            newStates.push_back(state.clone());
        }
    }

    states = newStates;
    *pack = states.at(pack->volume);
}