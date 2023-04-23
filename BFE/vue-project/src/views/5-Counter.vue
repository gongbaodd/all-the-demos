<script setup lang="ts">
import { ref } from 'vue'

interface UseCounterOptions {
  min?: number
  max?: number
}

/**
 * Implement the composable function
 * 1. inc (+)
 * 2. dec (-)
 * 3. reset
 * 4. min & max opotion support
 * Make sure the function works correctly
 */
function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min, max } = options
  const count = ref(initialValue)

  const inc = () => {
    if (max !== undefined && count.value >= max) return
    count.value++
  }

  const dec = () => {
    if (min !== undefined && count.value <= min) return
    count.value--
  }

  const reset = () => {
    count.value = initialValue
  }

  return { count, inc, dec, reset }
}

const { count, inc, dec, reset } = useCounter(0, { min: 0, max: 10 })
</script>

<template>
  <div>
    <button @click="dec">-</button>
    <span>{{ count }}</span>
    <button @click="inc">+</button>
    <button @click="reset">reset</button>
  </div>
</template>
