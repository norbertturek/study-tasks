<template>
  <div class="calculator-view">
    <h1>Vue Calculator</h1>
    <Calculator />
  </div>
</template>

<script setup lang="ts">
import Calculator from '@/components/Calculator.vue'
</script>

<style scoped>
.calculator-view {
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 2rem;
  color: var(--color-heading);
}
</style> 