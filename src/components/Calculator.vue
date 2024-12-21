<template>
  <div class="calculator">
    <display :value="display" />
    <number-pad @digit="appendDigit" @operator="setOperator" @calculate="calculate" @clear="clear" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Display from './Display.vue'
import NumberPad from './NumberPad.vue'

const display = ref<string>('0')
const currentNumber = ref<string>('')
const previousNumber = ref<string>('')
const currentOperator = ref<string>('')

const appendDigit = (digit: string): void => {
  if (display.value === '0') {
    display.value = digit
  } else {
    display.value += digit
  }
  currentNumber.value = display.value
}

const setOperator = (operator: string): void => {
  previousNumber.value = currentNumber.value
  currentOperator.value = operator
  display.value = '0'
}

const calculate = (): void => {
  const prev = parseFloat(previousNumber.value)
  const current = parseFloat(currentNumber.value)
  let result = 0

  switch (currentOperator.value) {
    case '+':
      result = prev + current
      break
    case '-':
      result = prev - current
      break
    case '*':
      result = prev * current
      break
    case '/':
      if (current === 0) {
        display.value = 'Error'
        return
      }
      result = prev / current
      break
  }

  display.value = result.toString()
  currentNumber.value = result.toString()
  previousNumber.value = ''
  currentOperator.value = ''
}

const clear = (): void => {
  display.value = '0'
  currentNumber.value = ''
  previousNumber.value = ''
  currentOperator.value = ''
}
</script>

<style scoped>
.calculator {
  max-width: 300px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style> 