<template>
  <form @submit.prevent="handleSubmit" class="registration-form social-form adf">
    <div class="form-group">
      <label for="username">Username</label>
      <input
        id="username"
        v-model="formData.username"
        type="text"
        required
        minlength="3"
        maxlength="20"
        pattern="[a-zA-Z0-9]+"
        :class="{ error: errors.username }"
      />
      <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        required
        :class="{ error: errors.email }"
      />
      <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="formData.password"
        type="password"
        required
        minlength="8"
        :class="{ error: errors.password }"
      />
      <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        v-model="formData.confirmPassword"
        type="password"
        required
        :class="{ error: errors.confirmPassword }"
      />
      <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
    </div>

    <button type="submit">Register</button>
  </form>
</template>

<script setup lang="ts">
  import { reactive, defineComponent } from 'vue'

  defineComponent({
    name: 'RegistrationForm'
  })

  interface FormData {
    username: string
    email: string
    password: string
    confirmPassword: string
  }

  interface FormErrors {
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
  }

  const formData = reactive<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const errors = reactive<FormErrors>({})

  const validateForm = (): boolean => {
    let isValid = true
    errors.username = ''
    errors.email = ''
    errors.password = ''
    errors.confirmPassword = ''

    // Username validation
    if (!formData.username) {
      errors.username = 'Username is required'
      isValid = false
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long'
      isValid = false
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters and numbers'
      isValid = false
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long'
      isValid = false
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Emit registration event with form data
      emit('register', { ...formData })
    }
  }

  const emit = defineEmits<{
    (e: 'register', data: Omit<FormData, 'confirmPassword'>): void
  }>()
</script>

<style scoped>
  .registration-form {
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
