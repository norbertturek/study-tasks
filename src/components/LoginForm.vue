<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="form-group">
      <label for="username">Username</label>
      <input
        id="username"
        v-model="formData.username"
        type="text"
        required
        :class="{ error: errors.username }"
      />
      <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="formData.password"
        type="password"
        required
        :class="{ error: errors.password }"
      />
      <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
    </div>

    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'

  interface FormData {
    username: string
    password: string
  }

  interface FormErrors {
    username?: string
    password?: string
  }

  const formData = reactive<FormData>({
    username: '',
    password: ''
  })

  const errors = reactive<FormErrors>({})

  const validateForm = (): boolean => {
    let isValid = true
    errors.username = ''
    errors.password = ''

    if (!formData.username) {
      errors.username = 'Username is required'
      isValid = false
    }

    if (!formData.password) {
      errors.password = 'Password is required'
      isValid = false
    }

    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      emit('login', { ...formData })
    }
  }

  const emit = defineEmits<{
    (e: 'login', data: FormData): void
  }>()
</script>

<style scoped>
  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  input.error {
    border-color: #dc3545;
  }

  .error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
