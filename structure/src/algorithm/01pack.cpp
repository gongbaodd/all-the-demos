/**
 * @file 01pack.c
 * @author gongbaodd
 * @brief
 * @version 0.1
 * @date 2022-07-05
 *
 * @copyright Copyright (c) 2022
 *
 * 01背包问题
 * 背包容量 MAX_WEIGHT
 * 总物品数 SUM
 * 第i个物品 weight[i], 价值 value[i]
 */

#include <iostream>
#include <vector>

class Item
{
public:
    int weight;
    int value;
    Item(int weight, int value);
};

Item::Item(int weight, int value)
{
    this->weight = weight;
    this->value = value;
}

class Pack
{
public:
    int volume;
    std::vector<Item> items;
    Pack(int volume);
    int value();
};

Pack::Pack(int volume = 0)
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

class PackState
{
private:
    int volume = 0;
    Pack *pack;
    std::vector<Pack> states;

public:
    PackState(Pack &pack);
    Pack expand();
    void putItem(Item item);
    Pack snapshot(Pack *pack);
};

PackState::PackState(Pack &pack)
{
    this->pack = &pack;

    states.push_back(Pack(0));
    while (pack.volume > volume)
    {
        Pack newState = expand();
        states.push_back(newState);
    }
    volume = 0;
}

Pack PackState::snapshot(Pack *pack)
{
    Pack clonePack(volume);
    clonePack.items.insert(clonePack.items.end(), pack->items.begin(), pack->items.end());
    return clonePack;
}

Pack PackState::expand()
{
    volume++;
    if (states.size() < pack->volume)
    {

        return snapshot(pack);
    }

    return snapshot(&states.at(volume - 1));
}

void PackState::putItem(Item item)
{
    if (item.weight > pack->volume)
    {
        return;
    }

    std::vector<Pack> newStates;

    newStates.push_back(Pack(0));
    while (pack->volume > volume)
    {
        Pack newState = expand();
        if (item.weight <= newState.volume)
        {
            // 袋子装的下寻找volume为volume-item.weight的状态
            // 并比较放与不放两种情况的价值
            try
            {
                Pack lastState = states.at(volume - item.weight);
                if (lastState.value() + item.value > newState.value())
                {
                    pack->items.clear();
                    pack->items.insert(pack->items.end(), lastState.items.begin(), lastState.items.end());
                    pack->items.push_back(item);
                    newState = snapshot(pack);
                }
            }
            catch (std::out_of_range error)
            {
                pack->items.push_back(item);
                newState.items.push_back(item);
            }
        }

        newStates.push_back(newState);
    }

    states = newStates;
    volume = 0;
}

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
    return 0;
}
