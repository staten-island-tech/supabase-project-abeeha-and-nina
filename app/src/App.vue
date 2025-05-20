<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import AuthPage from './views/AuthPage.vue';
import { gsap } from "gsap"
import { ref, onMounted } from 'vue'
import { useAuthStore } from './stores/pinia';
import { supabase } from '@/supabase';

const auth = useAuthStore()

const headerRef = ref<HTMLElement | null>(null)

onMounted(async() => {
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
      <RouterLink
        v-if="!auth.isLoggedIn"
        to="/auth"
        class="hover:text-xl duration-150 font-medium flex justify-center italic"
      >
        Register or Login Here
      </RouterLink>
      <div v-else class="text-center mt-4">
        <p class="flex justify-center font-semibold ml-48 px-4 py-4">You are logged in!</p>
        <div class="flex justify-center">
          <button @click="auth.logout" class="hover:text-xl duration-150 font-medium flex justify-center italic cursor">Logout</button>
        </div>
      </div>

      <br />
      <RouterView />
    </div>
  </header>
</template>