<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AuthPage from './views/AuthPage.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterView/>
      <AuthPage/>
      <nav>
</nav>
    </div>
  </header>

</template>
