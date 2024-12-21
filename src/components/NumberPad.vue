<template>
  <div class="number-pad">
    <button v-for="n in 9" :key="n" @click="emit('digit', n.toString())">{{ n }}</button>
    <button @click="emit('digit', '0')">0</button>
    <button @click="emit('operator', '+')">+</button>
    <button @click="emit('operator', '-')">-</button>
    <button @click="emit('operator', '*')">×</button>
    <button @click="emit('operator', '/')">/</button>
    <button @click="emit('calculate')">=</button>
    <button @click="emit('clear')">C</button>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'digit', value: string): void
  (e: 'operator', value: string): void
  (e: 'calculate'): void
  (e: 'clear'): void
}

const emit = defineEmits<Emits>()
</script>

<style scoped>
.number-pad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

button {
  padding: 1rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}
</style> 