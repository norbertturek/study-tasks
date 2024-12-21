<template>
  <div class="login">
    <h1>Login</h1>
    <login-form @login="handleLogin" />
  </div>
</template>

<script setup lang="ts">
  import LoginForm from '@/components/LoginForm.vue'
  import { useRouter } from 'vue-router'

  interface LoginData {
    username: string
    password: string
  }

  const router = useRouter()

  const handleLogin = (data: LoginData) => {
    // Simulate login success (in a real app, this would be an API call)
    console.log('Login data:', data)
    // Redirect to calculator page after successful login
    router.push('/')
  }
</script>

<style scoped>
  .login {
    padding: 2rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--color-heading);
  }
</style>
