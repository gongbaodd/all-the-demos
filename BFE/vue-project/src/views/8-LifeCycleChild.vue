// Child.vue

<script setup lang="ts">
import { onMounted, inject, onBeforeUnmount, type Ref } from "vue"

const timer = inject<Ref<number>>('timer')
const count = inject<Ref<number>>('count')


onMounted(() => {
  // The timer will work abnormally when the child component is toggled. Lets fix it.
  if(timer) timer.value = window.setInterval(() => {
    count && count.value++
  }, 1000)
})

onBeforeUnmount(() => {
  if(timer) window.clearInterval(timer.value)
})

</script>

<template>
  <div>
    <p>
      Child Component: {{ count }}
    </p>
  </div>
</template>