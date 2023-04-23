<script setup lang="ts">
import { ref, h } from 'vue'
import type { FunctionalComponent as FC } from 'vue'

/**
 * Implement a functional component :
 * 1. Render the list elements (ul/li) with the list data
 * 2. Change the list item text color to red when clicked.
 */

interface Iitem {
  list: { name: string }[]
  activeIndex: number
}

const ListComponent: FC<Iitem, ['toggle']> = (props, { emit }) => {
  const { list, activeIndex } = props

  return h(
    'ul',
    {},
    list.map((item, index) => {
      return h(
        'li',
        {
          key: item.name,
          style: {
            color: activeIndex == index ? 'red' : ''
          },
          onClick: () => emit('toggle', index)
        },
        item.name
      )
    })
  )
}

const list = [
  {
    name: 'John'
  },
  {
    name: 'Doe'
  },
  {
    name: 'Smith'
  }
]

const activeIndex = ref(0)

function toggle(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <list-component :list="list" :activeIndex="activeIndex" @toggle="toggle" />
</template>
