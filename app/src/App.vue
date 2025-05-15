<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
// import AuthPage from './views/AuthPage.vue';
import { gsap } from "gsap"
import { ref, onMounted } from 'vue'

const headerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.from(headerRef.value, {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  })
})
</script>

<template>
  <header>
        <div class="pt-3 flex justify-center">
    <RouterLink to="/" class="border-2 cursor-pointer px-3 py-3 rounded-lg hover:text-xl duration-200">Home</RouterLink>
    </div>
    <h1
      ref="headerRef"
      class="flex justify-center font-extrabold text-4xl ml-48 px-4 py-4"
    >
      Welcome to the Finance App!
    </h1>
    <div class="wrapper">
      <RouterLink to="/auth" class="hover:text-xl duration-150 font-medium flex justify-center italic"
        >Register or Login Here</RouterLink><br/>
      <!-- <RouterView/> -->
      <nav>
      </nav>
    </div>
  </header>
</template>