<template>
  <div class="app">
    <nav>
      <router-link to="/">Calculator</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
.app {
  text-align: center;
  padding: 2rem;
}

nav {
  padding: 1rem;
  margin-bottom: 2rem;
}

nav a {
  color: var(--color-text);
  text-decoration: none;
  padding: 0.5rem 1rem;
}

nav a.router-link-active {
  color: var(--color-heading);
  font-weight: bold;
}
</style>
