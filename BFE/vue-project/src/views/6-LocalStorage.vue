<script setup lang="ts">
import { ref, watchEffect } from 'vue'

/**
 * Implement the composable function
 Make sure the function works correctly
*/
function useLocalStorage(key: string, initialValue: any) {
  const value = ref(initialValue)

  watchEffect(() => {
    localStorage.setItem(key, JSON.stringify(value.value))
  })

  return value
}

const counter = useLocalStorage('counter', 0)
</script>

<template>
  <div>
    <!-- We can get the localStorage by triggering the getter: -->
    <span>{{ counter }}</span>
    <!-- We can set the localStorage by triggering the setter: -->
    <button @click="() => (counter = 1)">setValue</button>
  </div>
</template>
