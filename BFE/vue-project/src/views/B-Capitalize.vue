<script setup lang="ts">
import { ref, vModelText } from 'vue'
const value = ref('')
vModelText.beforeUpdate = (el, { value, modifiers }) => {
  if (value && modifiers.capitalize) {
    el.value = value[0].toUpperCase() + value.slice(1)
  }
}
</script>

<template>
  <input type="text" v-model.capitalize="value" />
</template>
