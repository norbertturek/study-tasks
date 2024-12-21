<template>
  <div class="display">{{ props.value || 0}}</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'Display'
})

interface Props {
  value: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '0'
})
</script>

<style scoped>
.display {
  background-color: #f0f0f0;
  padding: 1rem;
  text-align: right;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  color: black;
}
</style> 