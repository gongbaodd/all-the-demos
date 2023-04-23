<script setup lang="ts">
import { watch, customRef } from 'vue'

/**
 * Implement the function
 */
function useDebouncedRef(value: string, delay = 200) {
  let timer: null | number = null
  let newValue = value

  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return newValue
      },
      set(val: string) {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
          trigger()
          newValue = val
        }, delay)
      }
    }
  })
}
const text = useDebouncedRef('hello')

/**
 * Make sure the callback only gets triggered once when entered multiple times in a certain timeout
 */
watch(text, (value) => {
  console.log(value)
})
</script>

<template>
  <label for="text">text: {{ text }}</label>
  <input name="text" id="text" v-model="text" />
</template>
