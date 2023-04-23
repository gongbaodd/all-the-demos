<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// Implement ...
function useEventListener(
  target: Window,
  event: keyof WindowEventMap,
  callback: EventListenerObject['handleEvent']
) {
  onMounted(() => {
    target.addEventListener(event, callback)
  })
  onUnmounted(() => {
    target.removeEventListener(event, callback)
  })
}

// Implement ...
function useMouse() {
  const x = ref(0)
  const y = ref(0)
  useEventListener(window, 'mousemove', (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY
  })

  return { x, y }
}
const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
