<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { gsap } from "gsap"
</script>

<template>
  <header>
    <h1 class="flex justify-center font-extrabold text-4xl ml-48 px-4 py-4">Welcome to the Finance App!</h1>
    <div class="wrapper">
      <RouterLink to="/auth" class="hover:text-xl duration-150 font-medium flex justify-center italic"
        >Register or Login Here</RouterLink><br/>
      <RouterView/>
      <nav>
      </nav>
    </div>
  </header>
</template>