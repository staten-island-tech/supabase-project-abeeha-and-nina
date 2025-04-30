<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
// import AuthPage from './views/AuthPage.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Welcome to the Finance App!</h1>
      <RouterLink to="/auth" class="text-blue-600 hover:underline font-medium"
        >Register or Login Here</RouterLink><br/>
        <RouterView/>
      <nav>
      </nav>
    </div>
  </header>
</template>