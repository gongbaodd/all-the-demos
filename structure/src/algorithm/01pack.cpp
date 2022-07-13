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
    Pack pack;
    std::vector<std::vector<Pack>> states;

public:
    PackState(Pack pack);
    Pack expand();
    void putItem(Item item);
    Pack snapshot();
};

PackState::PackState(Pack pack)
{
    this->pack = pack;
    std::vector<Pack> Item0States;
    while (pack.volume > volume)
    {
        Pack newState = expand();
        Item0States.push_back(newState);
    }
    states.push_back(Item0States);
    volume = 0;
}

Pack PackState::snapshot()
{
    Pack pack(volume);
    pack.items.insert(pack.items.end(), this->pack.items.begin(), this->pack.items.end());
    return pack;
}

Pack PackState::expand()
{
    volume++;
    Pack clonePack = snapshot();
    return clonePack;
}

void PackState::putItem(Item item)
{
    if (item.weight > pack.volume)
    {
        return;
    }

    std::vector<Pack> thisItemState;
    std::vector<Pack> lastItemState = states.back();

    while (pack.volume > volume)
    {
        Pack newState = expand();
        if (item.weight < newState.volume)
        {
            // 袋子装的下寻找volume为volume-item.weight的状态
            // 并比较放与不放两种情况的价值
            try
            {
                Pack lastState = lastItemState.at(volume - 1 - item.weight);
                if (lastState.value() + item.value > newState.value())
                {
                    pack.items.push_back(item);
                    newState.items.push_back(item);
                }
            }
            catch (std::out_of_range error)
            {
                pack.items.push_back(item);
                newState.items.push_back(item);
            }
        }

        thisItemState.push_back(newState);
    }

    states.push_back(thisItemState);
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

    state.putItem(items.front());
    // for (auto item : items)
    // {
    //     state.putItem(item);
    // }

    return 0;
}
