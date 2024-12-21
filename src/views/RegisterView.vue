<template>
  <div class="register">
    <h1>Register</h1>
    <registration-form @register="handleRegister" />
  </div>
</template>

<script setup lang="ts">
  import RegistrationForm from '@/components/RegistrationForm.vue'

  interface RegistrationData {
    username: string
    email: string
    password: string
  }

  const handleRegister = (data: RegistrationData) => {
    // Here you would typically make an API call to register the user
    console.log('Registration data:', data)
  }
</script>

<style scoped>
  .register {
    padding: 2rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--color-heading);
  }
</style>
